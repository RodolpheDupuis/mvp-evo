// src/app/api/sync-user/route.ts
import { NextResponse } from "next/server";
import { syncUserWithDatabase } from "@/app/[locale]/lib/userSync";

export async function POST(request: Request) {
  try {
    const { firebaseUid, email } = await request.json();
    
    if (!firebaseUid) {
      return NextResponse.json(
        { error: "Firebase UID is required" },
        { status: 400 }
      );
    }
    
    const user = await syncUserWithDatabase(firebaseUid, email);
    
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error syncing user:", error);
    return NextResponse.json(
      { error: "Failed to sync user" },
      { status: 500 }
    );
  }
}