export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-black text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Wkt3 Dashboard</h1>
      <div>{children}</div>
    </div>
  );
}
