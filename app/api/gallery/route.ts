import { NextResponse } from "next/server";
import { requireDbAdmin } from "@/lib/firebase-admin";

const COLLECTION = "gallery";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || null;

    const db = requireDbAdmin();
    const snapshot = await db.collection(COLLECTION).get();
    const items: Array<any> = [];
    snapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));

    // optional category filtering
    const filtered = category
      ? items.filter((i) => i.category === category)
      : items;

    return NextResponse.json(filtered);
  } catch (err) {
    console.error("gallery GET error", err);
    // Return empty array instead of error so gallery still renders
    return NextResponse.json([], { status: 200 });
  }
}
