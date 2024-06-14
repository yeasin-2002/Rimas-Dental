import { baloo } from "@/fonts";
import React from "react";
import { TeamCard } from "../ui/Cards/TeamCard";
interface Props extends React.ComponentProps<"div"> {}

export const OurTeam = (props: Props) => {
	return (
		<section {...props} className="mt-10 md:container md:py-6">
			<div className="space-y-2 *:text-center">
				<p className="font-semibold text-yellowOrange-100">দক্ষ এবং পেশাদার</p>
				<h4 className={`font-grotesk text-3xl font-bold text-deepBlue-100`}>
					আমাদের প্রতিশ্রুতিবদ্ধ ডেন্টাল দল
				</h4>
				<p className="mx-auto mt-2 max-w-prose text-left font-grotesk text-lg text-deepBlue-100/80">
					আমাদের প্রতিশ্রুতিবদ্ধ এবং দক্ষ ডেন্টাল দলটি আপনার ডেন্টাল স্বাস্থ্যের
					প্রতি আমাদের অবদানকে পুনর্বিবেচনা করতে আন্তরিকভাবে প্রস্তুত। আমরা
					আপনার প্রতিটি ডেন্টাল প্রয়োজনের জন্য একটি সুবিধাজনক এবং উন্নত সেবা
					সরবরাহ করতে অঙ্গীকারী।
				</p>
			</div>

			<div className="mt-5 grid grid-cols-1 gap-8 px-10 md:grid-cols-2">
				<TeamCard />
				<TeamCard />
			</div>
		</section>
	);
};
