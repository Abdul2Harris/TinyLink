import AddLinkForm from "@/components/AddLinkForm";
import DashboardTable from "@/components/DashboardTable";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const links = await prisma.link.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <AddLinkForm />
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <DashboardTable />
      </div>
    </div>
  );
}
