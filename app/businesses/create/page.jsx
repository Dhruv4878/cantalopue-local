import CreateBusiness from "@/components/businesses/Create";
import BusinessHeader from "@/components/businesses/logo";

export default function CreateBusinessPage() {
	return (
		<>
			<BusinessHeader />
			<div className="pt-20">
				<CreateBusiness />
			</div>
		</>
	);
}


