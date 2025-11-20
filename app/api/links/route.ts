import prisma from "@/lib/prisma";
import { generateUniqueCode, isValidCode, isValidUrl } from "@/lib/utils";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const links = await prisma.link.findMany({
      orderBy: { createdAt: "desc" }, // Most recent first
      select: {
        code: true,
        url: true,
        clicks: true,
        lastClicked: true,
        createdAt: true,
      },
    });

    return NextResponse.json(links, {
      status: 200, 
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("GET /api/links error:", error);
    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { url, code } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL required" },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    if (!isValidUrl(url)) {
      return NextResponse.json(
        { error: "Not a valid Url" },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    let shortCode = code?.trim() || null;

    if (shortCode) {
      if (!isValidCode(shortCode)) {
        return NextResponse.json(
          { error: "Code must be 6-8 alphanumeric characters" },
          { status: 400, headers: { "Cache-Control": "no-store" } }
        );
      }

      const exists = await prisma.link.findUnique({
        where: { code: shortCode },
      });

      if (exists) {
        return NextResponse.json(
          { error: "Short Code Already exsists" },
          { status: 409, headers: { "Cache-Control": "no-store" } }
        );
      }
    } else {
      shortCode = await generateUniqueCode();
    }

    const newLink = await prisma.link.create({
      data: { url, code: shortCode },
    });

    return NextResponse.json(newLink, {
      status: 201,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }
}
