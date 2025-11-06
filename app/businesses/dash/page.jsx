// app/content/dashboard/page.tsx or .jsx
import { Suspense } from "react";
import Dashboard from "@/components/Contentgenerate/Dashboard";
import BusinessHeader from "@/components/businesses/logo";

export const dynamic = "force-dynamic"; // prevents static prerender crash

export default function DashboardPage() {
  return (
    <>
      <BusinessHeader />
      <div className="pt-20" />
      <Suspense fallback={<div className="p-6">Loading dashboard…</div>}>
        <Dashboard />
      </Suspense>
    </>
  );
}
