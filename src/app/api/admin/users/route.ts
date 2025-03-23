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

// Mock users data
const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", emailVerified: true, image: "", firebaseUid: "" },
  { id: 2, name: "Jane Doe", email: "jane@example.com", emailVerified: true, image: "", firebaseUid: "" },
];

// GET /api/admin/users - Get all users
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<any> }
) {
  try {
    // For demo purposes, we'll skip the admin check
    // In a real app, you would verify the user's admin status here

    // Resolve params if it's a Promise
    const resolvedParams = params ? await params : {};

    // Get users from database
    let users = [];
    try {
      users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          emailVerified: true,
          image: true,
          firebaseUid: true,
        },
      });
    } catch (error) {
      console.error("Error accessing database:", error);
      // If database access fails, use mock data
      users = mockUsers;
    }

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST /api/admin/users - Create a new user
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<any> }
) {
  try {
    // For demo purposes, we'll skip the admin check
    // In a real app, you would verify the user's admin status here

    // Resolve params if it's a Promise
    const resolvedParams = params ? await params : {};
    
    const data = await request.json();

    // Validate required fields
    if (!data.email || !data.name) {
      return NextResponse.json(
        { error: "Email and name are required" },
        { status: 400 }
      );
    }

    // Create a new user
    try {
      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          emailVerified: null, // Changed from false to null to match expected type
          image: "",
          firebaseUid: "",
        },
      });
      return NextResponse.json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
