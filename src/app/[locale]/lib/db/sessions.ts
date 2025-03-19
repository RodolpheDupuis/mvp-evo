import { prisma } from '../prisma';
import type { Session } from '@prisma/client';

// Create a session
export async function createSession(sessionData: {
  sessionToken: string;
  userId: string;
  expires: Date;
}) {
  try {
    return await prisma.session.create({
      data: sessionData
    });
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
}

// Get session by token
export async function getSessionByToken(sessionToken: string) {
  try {
    return await prisma.session.findUnique({
      where: { sessionToken },
      include: { user: true }
    });
  } catch (error) {
    console.error('Error fetching session by token:', error);
    throw error;
  }
}

// Get all sessions for a user
export async function getUserSessions(userId: string) {
  try {
    return await prisma.session.findMany({
      where: { userId }
    });
  } catch (error) {
    console.error('Error fetching user sessions:', error);
    throw error;
  }
}

// Update session
export async function updateSession(sessionToken: string, sessionData: Partial<Session>) {
  try {
    return await prisma.session.update({
      where: { sessionToken },
      data: sessionData
    });
  } catch (error) {
    console.error('Error updating session:', error);
    throw error;
  }
}

// Delete session
export async function deleteSession(sessionToken: string) {
  try {
    return await prisma.session.delete({
      where: { sessionToken }
    });
  } catch (error) {
    console.error('Error deleting session:', error);
    throw error;
  }
}

// Delete expired sessions
export async function deleteExpiredSessions() {
  try {
    return await prisma.session.deleteMany({
      where: {
        expires: {
          lt: new Date()
        }
      }
    });
  } catch (error) {
    console.error('Error deleting expired sessions:', error);
    throw error;
  }
}