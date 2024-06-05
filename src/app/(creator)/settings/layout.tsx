import SettingsDashboardNav from "@/components/creator/SettingsDashboardNav";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-screen-xl mx-auto p-8 space-y-10">
      <div className="space-y-4 border-b pb-4 border-gray-300">
        <h2 className="text-2xl font-bold tracking-wider">Settings</h2>
        <p>Manage your account setting and update you information.</p>
      </div>
      <div className="lg:grid lg:grid-cols-12 flex flex-col gap-4">
        <SettingsDashboardNav />
        {children}
      </div>
    </main>
  );
}
