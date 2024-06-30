"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { CloudUpload, UploadingLoop } from "../icons";

interface FileWithPreview extends File {
	preview: string;
}

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useEdgeStore } from "@/lib/edgestore";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "./button";

interface Props extends React.ComponentProps<"button"> {
	onSuccessUpload: (v: string) => void;
}

export const PhotoUploaderDND = ({
	children,
	onSuccessUpload,
	...props
}: Props) => {
	const [file, setFile] = useState<FileWithPreview | null>(null);
	const [isModalClosed, setIsModalClosed] = useState(false);
	const [isUploading, setIsUploading] = useState(false);

	const { edgestore } = useEdgeStore();

	const onDrop = (acceptedFiles: File[]) => {
		const acceptedFile = acceptedFiles[0];
		if (acceptedFile) {
			const fileWithPreview = Object.assign(acceptedFile, {
				preview: URL.createObjectURL(acceptedFile),
			}) as FileWithPreview;

			setFile(fileWithPreview);
		}
	};

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		multiple: false,
	});

	useEffect(() => {
		return () => {
			if (file) {
				URL.revokeObjectURL(file.preview);
			}
		};
	}, [file]);

	const onUpload = async () => {
		setIsUploading(true);
		try {
			if (!file) return;
			const res = await edgestore.publicFiles.upload({ file });

			if (!res) throw new Error("Upload failed");
			onSuccessUpload(res.url);
			toast.success("Upload successful");
			setIsModalClosed(true);
		} catch (error) {
			toast.error("Upload failed");
		} finally {
			setIsUploading(false);
		}
	};
	return (
		<Dialog open={isModalClosed} onOpenChange={setIsModalClosed}>
			<DialogTrigger {...props}>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Upload your photo?</DialogTitle>
				</DialogHeader>
				<div className="py-4">
					{file ? (
						<div className="relative  ">
							<Image
								src={file?.preview}
								alt="Preview"
								width={100}
								height={100}
								className=" rounded-lg mx-auto  size-full max-h-80 object-cover"
							/>

							<button
								className="absolute top-3 right-3 p-1 bg-white rounded-full cursor-pointer"
								onClick={() => setFile(null)}
							>
								<X className="text-black " />
							</button>
						</div>
					) : (
						<div
							{...getRootProps()}
							className=" h-56 w-full  mx-auto aspect-square  items-center justify-center flex flex-col  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
						>
							<input type="file" className="hidden" {...getInputProps()} />

							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<CloudUpload className="size-10" />
								<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
									<span className="font-semibold">Click to upload</span> or drag
									and drop
								</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">
									SVG, PNG, JPG or GIF
								</p>
							</div>
						</div>
					)}
				</div>
				<div className="flex items-center gap-x-3">
					<Button variant={"outline"} onClick={() => setIsModalClosed(false)}>
						Cancel
					</Button>
					<Button
						variant={"outline"}
						className="grow"
						onClick={onUpload}
						disabled={!file || isUploading}
					>
						{isUploading ? <UploadingLoop /> : "Upload"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
