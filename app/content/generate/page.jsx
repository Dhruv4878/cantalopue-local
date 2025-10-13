import GenerateAIContent from "@/components/Contentgenerate/Content";
import BusinessHeader from "@/components/businesses/logo";
import Toast from "@/components/Contentgenerate/Toast";

  export default function ContentPage(  ) {
  
  return (
    <>

         <BusinessHeader />
<div className="pt-20" />
      <GenerateAIContent />
      <Toast />
    </>
  );
}
