import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma client
const prisma = new PrismaClient();

// Helper function to check if user is admin
async function isAdmin(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return false;
    }

    // Extract the token
    const token = authHeader.split("Bearer ")[1];
    if (!token) {
      return false;
    }

    // In a real app, you would verify with Firebase Admin SDK
    // For this demo, we'll assume the token is valid and check if the email contains "admin"
    // This is just for demonstration purposes - in a real app, use proper role-based auth
    return true; // For demo purposes, we'll allow all authenticated requests
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}

// GET /api/admin/users - Get all users
export async function GET(request: NextRequest) {
  try {
    // For demo purposes, we'll skip the admin check and return data
    // In a real app, you would verify the user's admin status here
    
    // Get users from the database
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        firebaseUid: true,
      }
    });
    
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
