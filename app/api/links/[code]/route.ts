import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  req: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    if (!code) {
      return NextResponse.json(
        { error: "Code parameter is required" },
        { status: 400 }
      );
    }

    const link = await prisma.link.findUnique({
      where: { code },
    });

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    return NextResponse.json(link, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error(
      `GET /api/links/${await params.then((p) => p.code)} error:`,
      error
    );
    return NextResponse.json(
      { error: "Failed to fetch link" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    if (!code) {
      return NextResponse.json(
        { error: "Code parameter is required" },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Check if link exists
    const link = await prisma.link.findUnique({ where: { code } });

    if (!link) {
      return NextResponse.json(
        { error: "Link not found" },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Delete the link
    await prisma.link.delete({ where: { code } });

    return NextResponse.json(
      { success: true, message: "Link deleted successfully" },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error(
      `DELETE /api/links/${await params.then((p) => p.code)} error:`,
      error
    );

    return NextResponse.json(
      { error: "Failed to delete link" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
