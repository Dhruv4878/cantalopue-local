import Dashboard from "@/components/Contentgenerate/Dashboard";
import BusinessHeader from "@/components/businesses/logo";
import { Suspense } from "react";

  export default function DashboardPage(  ) {
  
  return (
    <>

         <BusinessHeader />
           <div className="pt-20" />
     <Suspense fallback={<div />}> 
       <Dashboard />
     </Suspense>
    </>
  );
}
