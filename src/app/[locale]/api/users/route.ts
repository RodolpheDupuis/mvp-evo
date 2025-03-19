import { NextResponse } from 'next/server';
import { db } from '@/app/[locale]/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const email = searchParams.get('email');
  const firebaseUid = searchParams.get('firebaseUid');
  
  try {
    let user;
    
    if (id) {
      user = await db.users.getUserById(id);
    } else if (email) {
      user = await db.users.getUserByEmail(email);
    } else if (firebaseUid) {
      user = await db.users.getUserByFirebaseUid(firebaseUid);
    } else {
      return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
    }
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firebaseUid, name, email, emailVerified, image } = body;
    
    const user = await db.users.createUser({
      firebaseUid,
      name,
      email,
      emailVerified: emailVerified ? new Date(emailVerified) : null,
      image
    });
    
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...userData } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
    }
    
    const user = await db.users.updateUser(id, userData);
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
  }
  
  try {
    await db.users.deleteUser(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}