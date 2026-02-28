import { NextResponse } from "next/server";
import { requireDbAdmin } from "@/lib/firebase-admin";
import { verifyAuth } from "@/lib/auth";

const CONTACT_DOC = "contactInfo";
const SETTINGS_COLLECTION = "settings";

export async function GET() {
  try {
    const db = requireDbAdmin();
    const doc = await db.collection(SETTINGS_COLLECTION).doc(CONTACT_DOC).get();
    if (!doc.exists) {
      return NextResponse.json({});
    }
    return NextResponse.json(doc.data());
  } catch (err) {
    console.error("contact GET", err);
    return NextResponse.json(
      { error: "Failed to fetch contact info" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await verifyAuth(request);
    const body = await request.json();
    const db = requireDbAdmin();
    await db.collection(SETTINGS_COLLECTION).doc(CONTACT_DOC).set(body);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("contact POST", err);
    return NextResponse.json(
      { error: "Unauthorized or failed" },
      { status: 401 },
    );
  }
}
