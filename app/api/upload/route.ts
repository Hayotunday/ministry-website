import { NextResponse } from "next/server";
import { put, del } from "@vercel/blob";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  try {
    // upload into gallery folder
    const pathname = `gallery/${file.name}`;
    const blob = await put(pathname, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json(blob);
  } catch (err) {
    console.error("upload error", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const url = body?.url || body?.pathname || body?.path;
    if (!url) {
      return NextResponse.json({ error: "url required" }, { status: 400 });
    }
    await del(url, { token: process.env.BLOB_READ_WRITE_TOKEN });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("delete blob error", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
