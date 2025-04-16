'use client';

import DashboardSidebar from "@/components/layout/DashboardSidebar";


export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="p-4 flex-1">{children}</div>
    </div>
  );
}