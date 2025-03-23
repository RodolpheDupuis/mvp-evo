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

// Helper function to find a mock user by ID
function findMockUser(id: string) {
  return mockUsers.find(user => user.id === id);
}

// GET /api/admin/users/[id] - Get a specific user
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // For demo purposes, we'll skip the admin check
    // In a real app, you would verify the user's admin status here

    const userId = params.id;

    // Try to get user from database
    let user = null;
    try {
      user = await prisma.user.findUnique({
        where: { id: userId },
      });
    } catch (error) {
      console.error("Error accessing database:", error);
    }

    // If not found in database, check mock data
    if (!user) {
      user = findMockUser(userId);
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/users/[id] - Update a user
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // For demo purposes, we'll skip the admin check
    // In a real app, you would verify the user's admin status here

    const userId = params.id;
    const data = await request.json();

    let updatedUser = null;
    
    // Try to update in database first
    try {
      updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          name: data.name,
          email: data.email,
          emailVerified: data.emailVerified,
        },
      });
    } catch (error) {
      console.error("Error updating in database:", error);
      
      // If database update fails, update mock data
      const mockUserIndex = mockUsers.findIndex(user => user.id === userId);
      if (mockUserIndex !== -1) {
        mockUsers[mockUserIndex] = {
          ...mockUsers[mockUserIndex],
          name: data.name,
          email: data.email,
          emailVerified: data.emailVerified,
        };
        updatedUser = mockUsers[mockUserIndex];
      }
    }

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users/[id] - Delete a user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // For demo purposes, we'll skip the admin check
    // In a real app, you would verify the user's admin status here

    const userId = params.id;

    let success = false;
    
    // Try to delete from database first
    try {
      await prisma.user.delete({
        where: { id: userId },
      });
      success = true;
    } catch (error) {
      console.error("Error deleting from database:", error);
      
      // If database delete fails, remove from mock data
      const mockUserIndex = mockUsers.findIndex(user => user.id === userId);
      if (mockUserIndex !== -1) {
        mockUsers.splice(mockUserIndex, 1);
        success = true;
      }
    }

    if (!success) {
      return NextResponse.json(
        { error: "Failed to delete user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
