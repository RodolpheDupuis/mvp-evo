import { prisma } from '../prisma';
import type { Account } from '@prisma/client';

// Create an account
export async function createAccount(accountData: {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}) {
  try {
    return await prisma.account.create({
      data: accountData
    });
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
}

// Get account by provider and provider account ID
export async function getAccountByProvider(provider: string, providerAccountId: string) {
  try {
    return await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId
        }
      },
      include: { user: true }
    });
  } catch (error) {
    console.error('Error fetching account by provider:', error);
    throw error;
  }
}

// Get all accounts for a user
export async function getUserAccounts(userId: string) {
  try {
    return await prisma.account.findMany({
      where: { userId }
    });
  } catch (error) {
    console.error('Error fetching user accounts:', error);
    throw error;
  }
}

// Update account
export async function updateAccount(
  provider: string, 
  providerAccountId: string, 
  accountData: Partial<Account>
) {
  try {
    return await prisma.account.update({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId
        }
      },
      data: accountData
    });
  } catch (error) {
    console.error('Error updating account:', error);
    throw error;
  }
}

// Delete account
export async function deleteAccount(provider: string, providerAccountId: string) {
  try {
    return await prisma.account.delete({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId
        }
      }
    });
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
}