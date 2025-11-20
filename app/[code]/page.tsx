import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RedirectPage(
  req: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const link = await prisma.link.findFirst({ where: { code } });

  if (!link) {
    return NextResponse.redirect(new URL("/", req.url), 302);
  }

  await prisma.link.update({
    where: { code },
    data: {
      clicks: { increment: 1 },
      lastClicked: new Date(),
    },
  });

  return NextResponse.redirect(link.url);
}
