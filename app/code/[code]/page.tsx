import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Stats({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link)
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Link Not Found</h1>
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Stats for {link.code}</h1>

      <div className="space-y-3 text-gray-800 bg-white p-5 rounded-xl shadow-sm">
        <p className="wrap-break-word">
          <strong>URL:</strong> {link.url}
        </p>
        <p>
          <strong>Total Clicks:</strong> {link.clicks}
        </p>
        <p>
          <strong>Last Clicked:</strong>{" "}
          {link.lastClicked
            ? new Date(link.lastClicked).toLocaleString()
            : "Never"}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(link.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
