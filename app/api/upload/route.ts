import { NextResponse } from "next/server";
// @ts-ignore: installed separately, types available after `npm install cloudinary`
import { v2 as cloudinary } from "cloudinary";

// configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  try {
    // convert file to buffer for upload
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadPromise: Promise<any> = new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "gallery" },
        (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      stream.end(buffer);
    });

    const result: any = await uploadPromise;
    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err) {
    console.error("upload error", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const publicId = body?.publicId || body?.id;
    if (!publicId) {
      return NextResponse.json({ error: "publicId required" }, { status: 400 });
    }
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("delete cloudinary error", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
