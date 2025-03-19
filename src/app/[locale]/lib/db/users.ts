import { prisma } from '../prisma';
import type { User, Profile } from '@prisma/client';

// Create a new user
export async function createUser(userData: {
  firebaseUid?: string;
  name?: string;
  email?: string;
  emailVerified?: Date | null;
  image?: string;
}) {
  try {
    return await prisma.user.create({
      data: userData
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Get user by ID
export async function getUserById(id: string) {
  try {
    return await prisma.user.findUnique({
      where: { id },
      include: { profile: true }
    });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

// Get user by Firebase UID
export async function getUserByFirebaseUid(firebaseUid: string) {
  try {
    return await prisma.user.findUnique({
      where: { firebaseUid },
      include: { profile: true }
    });
  } catch (error) {
    console.error('Error fetching user by Firebase UID:', error);
    throw error;
  }
}

// Get user by email
export async function getUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email },
      include: { profile: true }
    });
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
}

// Update user
export async function updateUser(id: string, userData: Partial<User>) {
  try {
    return await prisma.user.update({
      where: { id },
      data: userData
    });
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// Delete user
export async function deleteUser(id: string) {
  try {
    return await prisma.user.delete({
      where: { id }
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}