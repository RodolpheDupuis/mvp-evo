// src/app/lib/userSync.ts
import { auth } from "./firebaseAdmin";
import { db } from "./db";

export async function syncUserWithFirebase(firebaseUid: string) {
  try {
    // Get user from Firebase
    const firebaseUser = await auth.getUser(firebaseUid);
    
    // Check if user exists in database
    let user = await db.users.getUserByFirebaseUid(firebaseUid);
    
    if (user) {
      // Update existing user
      await db.users.updateUser(user.id, {
        name: firebaseUser.displayName || user.name,
        email: firebaseUser.email || user.email,
        emailVerified: firebaseUser.emailVerified ? new Date() : user.emailVerified,
        image: firebaseUser.photoURL || user.image
      });
      
      // Get updated user with profile
      user = await db.users.getUserByFirebaseUid(firebaseUid);
    } else {
      // Create new user
      const newUser = await db.users.createUser({
        firebaseUid,
        name: firebaseUser.displayName || undefined,
        email: firebaseUser.email || undefined,
        emailVerified: firebaseUser.emailVerified ? new Date() : undefined,
        image: firebaseUser.photoURL || undefined
      });
      
      // Create profile for new user
      if (newUser) {
        await db.profiles.createProfile({
          userId: newUser.id
        });
      }
      
      // Get user with profile
      user = await db.users.getUserByFirebaseUid(firebaseUid);
    }
    
    return user;
  } catch (error) {
    console.error('Error syncing user with Firebase:', error);
    throw error;
  }
}

/**
 * Syncs a Firebase user with the Prisma database
 * Creates or updates a user record in Prisma with the Firebase UID
 */
export async function syncUserWithDatabase(firebaseUid: string, email: string | null) {
  try {
    // Check if user already exists in Prisma DB with this Firebase UID
    const existingUser = await db.users.getUserByFirebaseUid(firebaseUid);

    if (existingUser) {
      // User exists, update if needed
      return existingUser;
    }

    // User doesn't exist, create new user
    const newUser = await db.users.createUser({
      firebaseUid,
      email: email || undefined, // Convert null to undefined
    });
    
    // Create profile for new user
    if (newUser) {
      await db.profiles.createProfile({
        userId: newUser.id
      });
    }
    
    // Get user with profile
    const userWithProfile = await db.users.getUserByFirebaseUid(firebaseUid);
    return userWithProfile;
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
    const user = await db.users.getUserByFirebaseUid(firebaseUid);
    
    return user;
  } catch (error) {
    console.error("Error getting user by Firebase UID:", error);
    throw error;
  }
}