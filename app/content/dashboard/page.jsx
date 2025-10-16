import Dashboard from "@/components/Contentgenerate/Dashboard";
import BusinessHeader from "@/components/businesses/logo";

export default function DashboardPage() {
    return (
        <>
            <BusinessHeader />
            <div className="pt-20">
                <Dashboard />
            </div>
        </>
    );
}