import { prisma } from '../prisma';
import type { Profile } from '@prisma/client';

// Create a profile
export async function createProfile(profileData: {
  userId: string;
  bio?: string;
  phoneNumber?: string;
}) {
  try {
    return await prisma.profile.create({
      data: profileData
    });
  } catch (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
}

// Get profile by user ID
export async function getProfileByUserId(userId: string) {
  try {
    return await prisma.profile.findUnique({
      where: { userId }
    });
  } catch (error) {
    console.error('Error fetching profile by user ID:', error);
    throw error;
  }
}

// Update profile
export async function updateProfile(userId: string, profileData: Partial<Profile>) {
  try {
    return await prisma.profile.update({
      where: { userId },
      data: profileData
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}

// Delete profile
export async function deleteProfile(userId: string) {
  try {
    return await prisma.profile.delete({
      where: { userId }
    });
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
}