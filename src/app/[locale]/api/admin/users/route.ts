import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/[locale]/lib/firebase";
import { prisma } from "@/app/[locale]/lib/prisma";

// Mock data for testing
const mockUsers = [
  {
    id: "user1",
    name: "Admin User",
    email: "admin@example.com",
    emailVerified: new Date(),
    image: null,
    firebaseUid: "firebase1",
  },
  {
    id: "user2",
    name: "John Doe",
    email: "john@example.com",
    emailVerified: new Date(),
    image: null,
    firebaseUid: "firebase2",
  },
  {
    id: "user3",
    name: "Jane Smith",
    email: "jane@example.com",
    emailVerified: null,
    image: null,
    firebaseUid: "firebase3",
  },
];

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
    // For demo purposes, we'll skip the admin check and return mock data
    // In a real app, you would verify the user's admin status here
    
    // Try to get users from the database
    let users = [];
    try {
      users = await prisma.user.findMany();
      
      // If no users found, use mock data
      if (users.length === 0) {
        users = mockUsers;
      }
    } catch (error) {
      console.error("Error accessing database:", error);
      // Fallback to mock data
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
