// src/app/lib/userSync.ts
import { PrismaClient } from "@prisma/client";
import { auth } from "./firebaseAdmin";

const prisma = new PrismaClient();

/**
 * Syncs a Firebase user with the Prisma database
 * Creates or updates a user record in Prisma with the Firebase UID
 */
export async function syncUserWithDatabase(firebaseUid: string, email: string | null) {
  try {
    // Check if user already exists in Prisma DB with this Firebase UID
    const existingUser = await prisma.user.findUnique({
      where: { firebaseUid },
    });

    if (existingUser) {
      // User exists, update if needed
      return existingUser;
    }

    // User doesn't exist, create new user
    const newUser = await prisma.user.create({
      data: {
        firebaseUid,
        email,
        profile: {
          create: {} // Create empty profile
        }
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error syncing user with database:", error);
    throw error;
  }
}

/**
 * Gets a user from Prisma DB by Firebase UID
 */
export async function getUserByFirebaseUid(firebaseUid: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { firebaseUid },
      include: { profile: true }
    });
    
    return user;
  } catch (error) {
    console.error("Error getting user by Firebase UID:", error);
    throw error;
  }
}