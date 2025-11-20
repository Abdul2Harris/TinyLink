import prisma from "@/lib/prisma";
import { generateUniqueCode, isValidCode, isValidUrl } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const getLinks = await prisma.link.findMany();
  return NextResponse.json(getLinks, { status: 201 });
}

export async function POST(request: Request) {
  try {
    const { url, code } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL required" }, { status: 400 });
    }

    if (!isValidUrl(url)) {
      return NextResponse.json({ error: "Not a valid Url" }, { status: 400 });
    }

    let shortCode = code?.trim() || null;

    if (shortCode) {
      if (!isValidCode(shortCode)) {
        return NextResponse.json(
          { error: "Code must be 6-8 alphanumeric characters" },
          { status: 400 }
        );
      }

      const exists = await prisma.link.findUnique({
        where: { code: shortCode },
      });

      if (exists) {
        return NextResponse.json(
          { error: "Short Code Already exsists" },
          { status: 409 }
        );
      }
    } else {
      shortCode = await generateUniqueCode();
    }

    const newLink = await prisma.link.create({
      data: { url, code: shortCode },
    });

    return NextResponse.json(newLink, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
