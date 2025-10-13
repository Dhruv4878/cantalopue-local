import ConfirmPlan from "@/components/subscriptions/ConfirmPlan"
import BusinessHeader from "@/components/businesses/logo";

export default async function ConfirmPlanPage( {params} ) {
  const { businessName } = params;
  return (
    <>

      <BusinessHeader  />
      <ConfirmPlan businessName={businessName} />
    </>
  );
}
