import { NextResponse } from "next/server";
import { requireDbAdmin } from "@/lib/firebase-admin";
import { verifyAuth } from "@/lib/auth";

const COLLECTION = "gallery";

export async function GET(request: Request) {
  try {
    await verifyAuth(request);
    const db = requireDbAdmin();
    const snapshot = await db.collection(COLLECTION).get();
    const items: Array<any> = [];
    snapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
    return NextResponse.json(items);
  } catch (err) {
    console.error("gallery GET", err);
    return NextResponse.json(
      { error: "Unauthorized or failed" },
      { status: 401 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await verifyAuth(request);
    const body = await request.json();

    if (body.type === "image" && !body.imageUrl) {
      return NextResponse.json(
        { error: "Missing imageUrl for image" },
        { status: 400 },
      );
    } else if (body.type === "video" && !body.videoUrl) {
      return NextResponse.json(
        { error: "Missing videoUrl for video" },
        { status: 400 },
      );
    }

    const db = requireDbAdmin();
    const ref = await db.collection(COLLECTION).add(body);
    return NextResponse.json({ id: ref.id });
  } catch (err) {
    console.error("gallery POST", err);
    return NextResponse.json(
      { error: "Unauthorized or failed" },
      { status: 401 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await verifyAuth(request);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("id required");
    const db = requireDbAdmin();
    await db.collection(COLLECTION).doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("gallery DELETE", err);
    return NextResponse.json(
      { error: "Unauthorized or failed" },
      { status: 401 },
    );
  }
}
