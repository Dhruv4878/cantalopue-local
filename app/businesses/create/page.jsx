import CreateBusiness from "@/components/businesses/create";
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


