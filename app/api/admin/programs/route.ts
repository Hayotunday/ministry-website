import { NextResponse } from "next/server";
import { requireDbAdmin } from "@/lib/firebase-admin";
import { verifyAuth } from "@/lib/auth";

const COLLECTION = "programs";

export async function GET(request: Request) {
  try {
    await verifyAuth(request);

    const db = requireDbAdmin();
    const snapshot = await db.collection(COLLECTION).get();
    const programs: Array<any> = [];
    snapshot.forEach((doc) => {
      programs.push({ id: doc.id, ...doc.data() });
    });
    return NextResponse.json(programs);
  } catch (err) {
    console.error("programs GET", err);
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
    const db = requireDbAdmin();
    const ref = await db.collection(COLLECTION).add(body);
    return NextResponse.json({ id: ref.id });
  } catch (err) {
    console.error("programs POST", err);
    return NextResponse.json(
      { error: "Unauthorized or failed" },
      { status: 401 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    await verifyAuth(request);
    const body = await request.json();
    if (!body.id) throw new Error("id required");
    const id = body.id;
    delete body.id;
    const db = requireDbAdmin();
    await db.collection(COLLECTION).doc(id).update(body);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("programs PUT", err);
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
    console.error("programs DELETE", err);
    return NextResponse.json(
      { error: "Unauthorized or failed" },
      { status: 401 },
    );
  }
}
