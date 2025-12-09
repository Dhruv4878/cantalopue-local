import React from "react";
import { Calendar } from "lucide-react";
import MonthCalendar from "./MonthCalendar";

const GlassCard = ({ children, className = "" }) => (
  <div
    className={`p-6 rounded-2xl relative overflow-hidden text-white ${className}`}
    style={{
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(15px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
    }}
  >
    {children}
  </div>
);

const CalendarPage = () => (
  <div className="p-4 lg:p-8">
    <GlassCard className="h-[80vh]">
      <h3 className="text-2xl font-bold mb-4">Content Calendar</h3>
      <div className="text-gray-400">
        <p>Interactive calendar view showing scheduled and published posts.</p>
        <div className="mt-4 h-[60vh]">
  <MonthCalendar />
</div>

      </div>
    </GlassCard>
  </div>
);

export default CalendarPage;
