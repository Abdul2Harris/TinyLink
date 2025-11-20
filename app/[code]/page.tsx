import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params
  const link = await prisma.link.findFirst({ where: { code } });

  if (!link) {
    return <h1>404 - Not Found</h1>;
  }

  await prisma.link.update({
    where: { code },
    data: {
      clicks: { increment: 1 },
      lastClicked: new Date(),
    },
  });

  redirect(link.url);
}
