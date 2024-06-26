import { Home } from "@/components/icons";

import Image from "next/image";
import { ReactNode } from "react";

import OT from "@/assets/images/OT.webp";
import { LinkTo, Logo } from "@/components";
import Link from "next/link";
import { ShowMatchRoute } from "./ShowMatchRoute";

const Auth = ({ children }: { children: ReactNode }) => {
	return (
		<section
			className="relative grid grid-cols-1 items-center justify-center p-4 md:grid-cols-2"
			aria-label="patient login"
		>
			<Link
				href={"/"}
				className="fixed left-2 top-2 flex items-center justify-center rounded-full border border-gray-800/20 bg-white p-4 md:p-2"
			>
				<Home className="size-6 text-gray-800" />
			</Link>
			<div>
				<Image
					src={
						"https://images.unsplash.com/photo-1667133295315-820bb6481730?w=500&h=500&auto=format&fit=crop&q=100&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE1fHxkZW50YWx8ZW58MHwxfDB8fHwy"
					}
					alt="Logo"
					className="hidden aspect-square object-cover md:block"
					width={500}
					height={500}
				/>
			</div>

			<div className="container mx-auto flex min-h-screen items-center justify-center px-6 dark:bg-gray-900">
				<div className="w-full max-w-md">
					<div className="mx-auto flex justify-center">
						<Logo href={"/"} />
					</div>
					<ShowMatchRoute />
					{children}
					<p className="mt-4 text-center">
						Are you a doctor?
						<LinkTo href={"/admin/login"} className="mx-1 text-main-400">
							login here
						</LinkTo>
						as a doctor.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Auth;
