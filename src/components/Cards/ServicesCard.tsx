import Image from "next/image";
import React from "react";

import { ServiceData } from "@/data";

import { cn } from "@/utils";

import Link from "next/link";

interface Props extends React.ComponentProps<"div"> {
	data: ServiceData;
}

export const ServicesCard = ({ data, ...rest }: Props) => {
	return (
		<div {...rest} className="cursor-pointer rounded-2xl bg-[#fefbf4] p-4">
			<div className="inline-block rounded-full bg-main-600/60 p-4">
				<Image
					src={data.icon}
					alt={`${data.title} icon`}
					width={100}
					height={100}
					className="size-14 shadow-sm"
				/>
			</div>
			<h5 className="font-grotesk text-2xl font-bold">{data.title}</h5>
			<p className={cn("text-md py-3")}>{data.desc}</p>

			<Link
				href={`/services/${data?.id}`}
				className="my-3 py-1 capitalize text-main-600"
				aria-label={`Learn more about  ${data.title}`}
			>
				Learn More
			</Link>
		</div>
	);
};
