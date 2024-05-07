import DashBoardSiderBar from "@/components/dashboard/dashboard-sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <DashBoardSiderBar />
      {children}
    </main>
  );
}
