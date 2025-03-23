# MVPEvo - Next.js Boilerplate

A modern, feature-rich Next.js boilerplate with authentication, payment processing, internationalization, and more.

## Features

- **Authentication**: Firebase + NextAuth integration
- **Payment Processing**: Stripe and LemonSqueezy integrations
- **Database**: PostgreSQL with Prisma ORM
- **UI**: TailwindCSS with shadcn/ui components
- **Internationalization**: Full i18n support with next-intl (English, French, Korean)
- **Admin Dashboard**: Complete admin interface for user management
- **Deployment**: Optimized for Vercel deployment

## Configuration Guide

This document will guide you through configuring all aspects of the MVP EVO boilerplate for your specific project needs.

## Table of Contents

1. [Environment Variables](#environment-variables)
2. [Authentication Setup](#authentication-setup)
3. [Payment Processing](#payment-processing)
4. [Database Configuration](#database-configuration)
5. [UI Customization](#ui-customization)
6. [Internationalization](#internationalization)
7. [Admin Dashboard](#admin-dashboard)
8. [API Routes](#api-routes)
9. [Deployment](#deployment)

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
# Firebase Admin SDK
FIREBASE_ADMIN_KEY={"type":"service_account","project_id":"YOUR_PROJECT_ID",...}

# NextAuth
NEXTAUTH_SECRET=your-secured-random-next-auth-key

# Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Email (Resend)
NEXT_PUBLIC_RESEND_API_KEY=your-resend-api-key

# Payment Processing
NEXT_PUBLIC_STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_LEMONSQUEEZY_API_KEY=your-lemonsqueezy-api-key
NEXT_PUBLIC_USE_STRIPE=true  # Set to false to use LemonSqueezy instead
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Change to your production URL in production

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"
```

## Authentication Setup

This boilerplate integrates Firebase Authentication with NextAuth.js for a seamless authentication experience.

### Firebase Setup

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Authentication in your Firebase project
3. Add Email/Password as a sign-in method
4. Create a Web App in your Firebase project
5. Copy the Firebase configuration values to your `.env.local` file

### Firebase Admin SDK Setup

1. Go to your Firebase project settings > Service accounts
2. Click "Generate new private key" to download your service account key
3. Convert the JSON file contents to a single line and add it as the `FIREBASE_ADMIN_KEY` in your `.env.local` file

### NextAuth Configuration

1. Generate a secure random string for `NEXTAUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```
2. Add the generated string to your `.env.local` file

The authentication system is already configured to:
- Use Firebase for authentication
- Sync user data with your PostgreSQL database via Prisma
- Handle user sessions with NextAuth.js

## Payment Processing

The boilerplate supports both Stripe and LemonSqueezy for payment processing.

### Stripe Configuration

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Add your Stripe secret key to `NEXT_PUBLIC_STRIPE_SECRET_KEY` in your `.env.local` file
4. Create products and prices in your Stripe Dashboard
5. Use the product IDs or price IDs in your application

The Stripe integration includes:
- Checkout session creation
- Success and cancel URL handling with locale support
- Product and price handling

### LemonSqueezy Configuration

1. Create a LemonSqueezy account at [lemonsqueezy.com](https://lemonsqueezy.com)
2. Get your API key from the LemonSqueezy Dashboard
3. Add your LemonSqueezy API key to `NEXT_PUBLIC_LEMONSQUEEZY_API_KEY` in your `.env.local` file
4. Update the `STORE_ID` and `DEFAULT_VARIANT_ID` in `src/lib/lemonsqueezy.ts` with your own values

To switch between payment processors, set `NEXT_PUBLIC_USE_STRIPE` to `true` for Stripe or `false` for LemonSqueezy.

## Database Configuration

The boilerplate uses PostgreSQL with Prisma ORM for database management.

### PostgreSQL Setup

1. Install PostgreSQL on your local machine or use a cloud provider
2. Create a new database for your project
3. Update the `DATABASE_URL` in your `.env.local` file with your database connection string

### Prisma Configuration

The Prisma schema is already configured in `prisma/schema.prisma` with models for:
- User
- Profile
- Account
- Session
- VerificationToken

To initialize your database:

```bash
npx prisma migrate dev --name init
```

To update your database after schema changes:

```bash
npx prisma migrate dev --name your-migration-name
```

### Database Interaction

The boilerplate includes utility functions for database interactions in:
- `src/app/[locale]/lib/prisma.ts`: Prisma client initialization
- `src/app/[locale]/lib/userSync.ts`: User synchronization between Firebase and PostgreSQL

These utilities provide methods for:
- Creating and updating users
- Syncing Firebase users with the database
- Managing user profiles

### Adding Custom Data Models and Handlers

The boilerplate follows a modular approach to database management. Here's how to add your own data models and handlers:

#### 1. Define New Models in Prisma Schema

Add your new models to the `prisma/schema.prisma` file:

```prisma
// Example: Adding a new Task model
model Task {
  id          String   @id @default(cuid())
  title       String
  description String?
  completed   Boolean  @default(false)
  dueDate     DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

Don't forget to update the User model to include the relation:

```prisma
model User {
  // Existing fields...
  tasks        Task[]
}
```

#### 2. Run Prisma Migration

After defining your models, create and apply a migration:

```bash
npx prisma migrate dev --name add_tasks_model
```

#### 3. Create a Handler File

Create a new handler file in `src/app/[locale]/lib/db/` directory:

```typescript
// src/app/[locale]/lib/db/tasks.ts
import { prisma } from '../prisma';
import type { Task } from '@prisma/client';

// Create a new task
export async function createTask(taskData: {
  title: string;
  description?: string;
  completed?: boolean;
  dueDate?: Date;
  userId: string;
}) {
  try {
    return await prisma.task.create({
      data: taskData
    });
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

// Get tasks by user ID
export async function getTasksByUserId(userId: string) {
  try {
    return await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

// Get task by ID
export async function getTaskById(id: string) {
  try {
    return await prisma.task.findUnique({
      where: { id }
    });
  } catch (error) {
    console.error('Error fetching task:', error);
    throw error;
  }
}

// Update task
export async function updateTask(id: string, taskData: Partial<Task>) {
  try {
    return await prisma.task.update({
      where: { id },
      data: taskData
    });
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

// Delete task
export async function deleteTask(id: string) {
  try {
    return await prisma.task.delete({
      where: { id }
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}
```

#### 4. Update the Database Index File

Update the `src/app/[locale]/lib/db/index.ts` file to include your new handlers:

```typescript
import * as userDb from './users';
import * as profileDb from './profiles';
import * as sessionDb from './sessions';
import * as accountDb from './accounts';
import * as taskDb from './tasks'; // Add this line

export const db = {
  users: userDb,
  profiles: profileDb,
  sessions: sessionDb,
  accounts: accountDb,
  tasks: taskDb // Add this line
};

export default db;
```

#### 5. Create API Routes for Your Model

Create API routes in `src/app/[locale]/api/tasks/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { db } from '@/app/[locale]/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const userId = searchParams.get('userId');
  
  try {
    if (id) {
      const task = await db.tasks.getTaskById(id);
      if (!task) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 });
      }
      return NextResponse.json(task);
    } else if (userId) {
      const tasks = await db.tasks.getTasksByUserId(userId);
      return NextResponse.json(tasks);
    } else {
      return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const task = await db.tasks.createTask(body);
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Missing task ID' }, { status: 400 });
    }
    
    const body = await request.json();
    const task = await db.tasks.updateTask(id, body);
    
    return NextResponse.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Missing task ID' }, { status: 400 });
    }
    
    await db.tasks.deleteTask(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

#### 6. Using Your New Model in Components

You can now use your new model in your components:

```typescript
// Example: Fetching tasks in a server component
import { db } from '@/app/[locale]/lib/db';

export default async function TaskList({ userId }: { userId: string }) {
  const tasks = await db.tasks.getTasksByUserId(userId);
  
  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.completed ? 'Completed' : 'Pending'}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

Or using the API routes in client components:

```typescript
'use client';
import { useState, useEffect } from 'react';

export default function ClientTaskList({ userId }: { userId: string }) {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch(`/api/tasks?userId=${userId}`);
      const data = await response.json();
      setTasks(data);
    }
    
    fetchTasks();
  }, [userId]);
  
  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.completed ? 'Completed' : 'Pending'}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

This modular approach allows you to easily add new data models and handlers to your application while maintaining a clean and organized codebase.

## UI Customization

### TailwindCSS

The boilerplate uses TailwindCSS for styling. The configuration is in `tailwind.config.ts`.

To customize:
1. Modify the `theme` section in `tailwind.config.ts`
2. Add your custom CSS in `src/app/globals.css`

### shadcn/ui

The boilerplate integrates shadcn/ui for high-quality UI components. The configuration is in `components.json`.

To add new components:

```bash
npx shadcn-ui add button
```

To customize the theme:
1. Modify the `style` in `components.json` (default is "new-york")
2. Update the `baseColor` in `components.json`

## Internationalization

The boilerplate supports multiple languages with next-intl.

### Supported Languages

- English (en) - default
- French (fr)
- Korean (kr)

### Adding Translations

1. Translations are stored in JSON files in the `messages` directory
2. Add or modify translations in the respective language files:
   - `messages/en.json`
   - `messages/fr.json`
   - `messages/kr.json`

### Using Translations

In client components:
```jsx
'use client';
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('namespace');
  return <div>{t('key')}</div>;
}
```

In server components:
```jsx
import { getTranslations } from 'next-intl/server';

export default async function MyServerComponent() {
  const t = await getTranslations('namespace');
  return <div>{t('key')}</div>;
}
```

### Navigation with Locales

Use the custom navigation utilities from `@/navigation` instead of Next.js navigation:

```jsx
import { Link, useRouter } from '@/navigation';

// For links
<Link href="/dashboard">Dashboard</Link>

// For programmatic navigation
const router = useRouter();
router.push('/dashboard');
```

### Locale Structure

The application follows the Next.js App Router conventions for internationalization:

1. All localized pages and components are placed in the `src/app/[locale]/` directory
2. API routes are placed in the `src/app/api/` directory (outside the locale structure)
3. The middleware handles redirecting users to their preferred locale

## Admin Dashboard

The boilerplate includes a complete admin dashboard for managing users and application settings.

### Admin Features

- User management (view, create, update, delete users)
- Role-based access control
- Localized admin interface

### Admin Routes

The admin dashboard is accessible at `/admin` and is protected by authentication. Only users with admin privileges can access it.

### Admin Components

The admin dashboard is built with reusable components located in `src/app/[locale]/admin/components/`:

- `UserList.tsx`: Component for displaying and managing users
- `AdminNav.tsx`: Navigation component for the admin dashboard
- `AdminLayout.tsx`: Layout component for the admin dashboard

### Adding Admin Features

To add new features to the admin dashboard:

1. Create a new component in `src/app/[locale]/admin/components/`
2. Add the component to the appropriate page in `src/app/[locale]/admin/`
3. Add any necessary API routes in `src/app/api/admin/`

## API Routes

The boilerplate uses Next.js API routes for server-side operations. With Next.js 15, the API route handlers have been updated to handle dynamic parameters as Promises.

### API Route Structure

API routes are located in the `src/app/api/` directory (outside the locale structure) to ensure they're accessible regardless of the user's locale.

### Creating API Routes

To create a new API route:

1. Create a new file in `src/app/api/` directory, e.g., `src/app/api/tasks/route.ts`
2. Implement the handler functions for the HTTP methods you need (GET, POST, PUT, DELETE)

Example API route with Next.js 15 compatibility:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/tasks
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<any> }
) {
  try {
    // Resolve params if it's a Promise
    const resolvedParams = await params;
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (userId) {
      const tasks = await prisma.task.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      });
      return NextResponse.json(tasks);
    } else {
      return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

// POST /api/tasks
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<any> }
) {
  try {
    // Resolve params if it's a Promise
    const resolvedParams = await params;
    
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.userId) {
      return NextResponse.json({ error: 'Title and userId are required' }, { status: 400 });
    }
    
    // Create task in database
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description || '',
        completed: data.completed || false,
        userId: data.userId
      }
    });
    
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
```

### Dynamic Route Parameters

For dynamic routes like `/api/tasks/[id]`, create a directory with the parameter name in brackets and a `route.ts` file inside:

```
src/app/api/tasks/[id]/route.ts
```

Example dynamic route handler with Next.js 15 compatibility:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/tasks/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<any> }
) {
  try {
    // Resolve params if it's a Promise
    const resolvedParams = await params;
    const taskId = resolvedParams.id;
    
    const task = await prisma.task.findUnique({
      where: { id: taskId }
    });
    
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    
    return NextResponse.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    return NextResponse.json({ error: 'Failed to fetch task' }, { status: 500 });
  }
}

// PUT /api/tasks/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<any> }
) {
  try {
    // Resolve params if it's a Promise
    const resolvedParams = await params;
    const taskId = resolvedParams.id;
    
    const data = await request.json();
    
    const task = await prisma.task.update({
      where: { id: taskId },
      data
    });
    
    return NextResponse.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

// DELETE /api/tasks/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<any> }
) {
  try {
    // Resolve params if it's a Promise
    const resolvedParams = await params;
    const taskId = resolvedParams.id;
    
    await prisma.task.delete({
      where: { id: taskId }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
```

### API Route Best Practices

1. Always place API routes in `src/app/api/` directory (outside the locale structure)
2. Handle params as a Promise for Next.js 15 compatibility
3. Use proper error handling and status codes
4. Validate input data before processing
5. Use Prisma for database operations

## Deployment

The boilerplate is optimized for deployment on Vercel.

### Vercel Deployment Steps

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Create a Vercel account at [vercel.com](https://vercel.com)
3. Create a new project and import your repository
4. Add all your environment variables from `.env.local` to the Vercel project settings
5. Deploy your project

### Environment Variables on Vercel

1. Go to your Vercel project
2. Navigate to Settings > Environment Variables
3. Add all the environment variables from your `.env.local` file
4. Make sure to update `NEXT_PUBLIC_APP_URL` to your production URL

### Custom Domains

1. In your Vercel project, go to Settings > Domains
2. Add your custom domain
3. Follow the instructions to configure DNS settings

## Getting Started

To run the project locally:

```bash
# Install dependencies
npm install

# Initialize the database
npx prisma migrate dev --name init

# Run the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## License

This boilerplate is licensed under the MIT License.
