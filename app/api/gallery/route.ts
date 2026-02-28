import { NextResponse } from "next/server";
import { requireDbAdmin } from "@/lib/firebase-admin";

const COLLECTION = "gallery";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "0", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);
    const category = searchParams.get("category") || null;

    const db = requireDbAdmin();
    const snapshot = await db.collection(COLLECTION).get();
    const items: Array<any> = [];
    snapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));

    // optional category filtering
    const filtered = category
      ? items.filter((i) => i.category === category)
      : items;

    const start = page * limit;
    const end = start + limit;
    const pageItems = filtered.slice(start, end);

    return NextResponse.json(pageItems);
  } catch (err) {
    console.error("gallery GET error", err);
    // Return empty array instead of error so gallery still renders
    return NextResponse.json([], { status: 200 });
  }
}
