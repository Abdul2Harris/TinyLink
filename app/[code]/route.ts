import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function HEAD() {
  return new Response(null, { status: 200 });
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) {
    return NextResponse.redirect(new URL("/", req.url), 302);
  }

  // Make sure redirect URL ALWAYS has protocol
  let redirectTo = link.url;
  if (!redirectTo.startsWith("http://") && !redirectTo.startsWith("https://")) {
    redirectTo = "https://" + redirectTo;
  }

  await prisma.link.update({
    where: { code },
    data: {
      clicks: { increment: 1 },
      lastClicked: new Date(),
    },
  });

  return NextResponse.redirect(link.url, 302);
}
