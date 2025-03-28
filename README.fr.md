# MVP EVO - Boilerplate Next.js

Un boilerplate Next.js moderne et riche en fonctionnalités avec authentification, traitement des paiements, internationalisation et plus encore.

## Fonctionnalités

- **Authentification** : Intégration Firebase + NextAuth
- **Traitement des paiements** : Intégrations Stripe et LemonSqueezy
- **Base de données** : PostgreSQL avec ORM Prisma
- **Interface utilisateur** : TailwindCSS avec composants shadcn/ui
- **Internationalisation** : Support i18n complet avec next-intl (Anglais, Français, Coréen)
- **Tableau de bord administrateur** : Interface d'administration complète pour la gestion des utilisateurs
- **Déploiement** : Optimisé pour le déploiement sur Vercel

## Guide de configuration

Ce document vous guidera à travers la configuration de tous les aspects du boilerplate MVP EVO pour les besoins spécifiques de votre projet.

## Table des matières

1. [Variables d'environnement](#variables-denvironnement)
2. [Configuration de l'authentification](#configuration-de-lauthentification)
3. [Traitement des paiements](#traitement-des-paiements)
4. [Configuration de la base de données](#configuration-de-la-base-de-données)
5. [Personnalisation de l'interface utilisateur](#personnalisation-de-linterface-utilisateur)
6. [Internationalisation](#internationalisation)
7. [Tableau de bord administrateur](#tableau-de-bord-administrateur)
8. [Routes API](#routes-api)
9. [Déploiement](#déploiement)

## Variables d'environnement

Créez un fichier `.env.local` à la racine de votre projet avec les variables suivantes :

```
# Firebase Admin SDK
FIREBASE_ADMIN_KEY={"type":"service_account","project_id":"VOTRE_PROJECT_ID",...}

# NextAuth
NEXTAUTH_SECRET=votre-clé-aléatoire-sécurisée-pour-next-auth

# Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY=votre-clé-api-firebase
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=votre-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=votre-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=votre-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=votre-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=votre-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=votre-measurement-id

# Email (Resend)
NEXT_PUBLIC_RESEND_API_KEY=votre-clé-api-resend

# Traitement des paiements
NEXT_PUBLIC_STRIPE_SECRET_KEY=votre-clé-secrète-stripe
NEXT_PUBLIC_LEMONSQUEEZY_API_KEY=votre-clé-api-lemonsqueezy
NEXT_PUBLIC_USE_STRIPE=true  # Mettre à false pour utiliser LemonSqueezy
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Changer pour votre URL de production en production

# Base de données
DATABASE_URL="postgresql://nom_utilisateur:mot_de_passe@localhost:5432/nom_base_de_données?schema=public"
```

## Configuration de l'authentification

Ce boilerplate intègre l'authentification Firebase avec NextAuth.js pour une expérience d'authentification fluide.

### Configuration de Firebase

1. Créez un projet Firebase sur [firebase.google.com](https://firebase.google.com)
2. Activez l'authentification dans votre projet Firebase
3. Ajoutez Email/Mot de passe comme méthode de connexion
4. Créez une application Web dans votre projet Firebase
5. Copiez les valeurs de configuration Firebase dans votre fichier `.env.local`

### Configuration du SDK Admin Firebase

1. Allez dans les paramètres de votre projet Firebase > Comptes de service
2. Cliquez sur "Générer une nouvelle clé privée" pour télécharger votre clé de compte de service
3. Convertissez le contenu du fichier JSON en une seule ligne et ajoutez-le comme `FIREBASE_ADMIN_KEY` dans votre fichier `.env.local`

### Configuration de NextAuth

1. Générez une chaîne aléatoire sécurisée pour `NEXTAUTH_SECRET` :
   ```bash
   openssl rand -base64 32
   ```
2. Ajoutez la chaîne générée à votre fichier `.env.local`

Le système d'authentification est déjà configuré pour :
- Utiliser Firebase pour l'authentification
- Synchroniser les données utilisateur avec votre base de données PostgreSQL via Prisma
- Gérer les sessions utilisateur avec NextAuth.js

## Traitement des paiements

Le boilerplate prend en charge à la fois Stripe et LemonSqueezy pour le traitement des paiements.

### Configuration de Stripe

1. Créez un compte Stripe sur [stripe.com](https://stripe.com)
2. Obtenez vos clés API depuis le tableau de bord Stripe
3. Ajoutez votre clé secrète Stripe à `NEXT_PUBLIC_STRIPE_SECRET_KEY` dans votre fichier `.env.local`
4. Créez des produits et des prix dans votre tableau de bord Stripe
5. Utilisez les IDs de produit ou de prix dans votre application

L'intégration Stripe comprend :
- Création de session de paiement
- Gestion des URLs de succès et d'annulation avec support de la locale
- Gestion des produits et des prix

### Configuration de LemonSqueezy

1. Créez un compte LemonSqueezy sur [lemonsqueezy.com](https://lemonsqueezy.com)
2. Obtenez votre clé API depuis le tableau de bord LemonSqueezy
3. Ajoutez votre clé API LemonSqueezy à `NEXT_PUBLIC_LEMONSQUEEZY_API_KEY` dans votre fichier `.env.local`
4. Mettez à jour le `STORE_ID` et le `DEFAULT_VARIANT_ID` dans `src/lib/lemonsqueezy.ts` avec vos propres valeurs

Pour basculer entre les processeurs de paiement, définissez `NEXT_PUBLIC_USE_STRIPE` à `true` pour Stripe ou `false` pour LemonSqueezy.

## Configuration de la base de données

Le boilerplate utilise PostgreSQL avec l'ORM Prisma pour la gestion de la base de données.

### Configuration de PostgreSQL

1. Installez PostgreSQL sur votre machine locale ou utilisez un fournisseur cloud
2. Créez une nouvelle base de données pour votre projet
3. Mettez à jour le `DATABASE_URL` dans votre fichier `.env.local` avec votre chaîne de connexion à la base de données

### Configuration de Prisma

Le schéma Prisma est déjà configuré dans `prisma/schema.prisma` avec des modèles pour :
- User (Utilisateur)
- Profile (Profil)
- Account (Compte)
- Session
- VerificationToken (Jeton de vérification)

Pour initialiser votre base de données :

```bash
npx prisma migrate dev --name init
```

Pour mettre à jour votre base de données après des modifications de schéma :

```bash
npx prisma migrate dev --name nom-de-votre-migration
```

### Interaction avec la base de données

Le boilerplate inclut des fonctions utilitaires pour les interactions avec la base de données dans :
- `src/app/[locale]/lib/prisma.ts` : Initialisation du client Prisma
- `src/app/[locale]/lib/userSync.ts` : Synchronisation des utilisateurs entre Firebase et PostgreSQL

Ces utilitaires fournissent des méthodes pour :
- Créer et mettre à jour des utilisateurs
- Synchroniser les utilisateurs Firebase avec la base de données
- Gérer les profils utilisateur

### Ajout de modèles de données et de gestionnaires personnalisés

Le boilerplate suit une approche modulaire pour la gestion de la base de données. Voici comment ajouter vos propres modèles de données et gestionnaires :

#### 1. Définir de nouveaux modèles dans le schéma Prisma

Ajoutez vos nouveaux modèles au fichier `prisma/schema.prisma` :

```prisma
// Exemple : Ajout d'un nouveau modèle Task (Tâche)
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

N'oubliez pas de mettre à jour le modèle User pour inclure la relation :

```prisma
model User {
  // Champs existants...
  tasks        Task[]
}
```

#### 2. Exécuter la migration Prisma

Après avoir défini vos modèles, créez et appliquez une migration :

```bash
npx prisma migrate dev --name add_tasks_model
```

#### 3. Créer un fichier gestionnaire

Créez un nouveau fichier gestionnaire dans le répertoire `src/app/[locale]/lib/db/` :

```typescript
// src/app/[locale]/lib/db/tasks.ts
import { prisma } from '../prisma';
import type { Task } from '@prisma/client';

// Créer une nouvelle tâche
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
    console.error('Erreur lors de la création de la tâche :', error);
    throw error;
  }
}

// Obtenir les tâches par ID utilisateur
export async function getTasksByUserId(userId: string) {
  try {
    return await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches :', error);
    throw error;
  }
}

// Obtenir une tâche par ID
export async function getTaskById(id: string) {
  try {
    return await prisma.task.findUnique({
      where: { id }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de la tâche :', error);
    throw error;
  }
}

// Mettre à jour une tâche
export async function updateTask(id: string, taskData: Partial<Task>) {
  try {
    return await prisma.task.update({
      where: { id },
      data: taskData
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche :', error);
    throw error;
  }
}

// Supprimer une tâche
export async function deleteTask(id: string) {
  try {
    return await prisma.task.delete({
      where: { id }
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche :', error);
    throw error;
  }
}
```

#### 4. Mettre à jour le fichier index de la base de données

Mettez à jour le fichier `src/app/[locale]/lib/db/index.ts` pour inclure vos nouveaux gestionnaires :

```typescript
import * as userDb from './users';
import * as profileDb from './profiles';
import * as sessionDb from './sessions';
import * as accountDb from './accounts';
import * as taskDb from './tasks'; // Ajoutez cette ligne

export const db = {
  users: userDb,
  profiles: profileDb,
  sessions: sessionDb,
  accounts: accountDb,
  tasks: taskDb // Ajoutez cette ligne
};

export default db;
```

#### 5. Créer des routes API pour votre modèle

Créez des routes API dans `src/app/[locale]/api/tasks/route.ts` :

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
        return NextResponse.json({ error: 'Tâche non trouvée' }, { status: 404 });
      }
      return NextResponse.json(task);
    } else if (userId) {
      const tasks = await db.tasks.getTasksByUserId(userId);
      return NextResponse.json(tasks);
    } else {
      return NextResponse.json({ error: 'Paramètre de requête manquant' }, { status: 400 });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches :', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const task = await db.tasks.createTask(body);
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de la tâche :', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID de tâche manquant' }, { status: 400 });
    }
    
    const body = await request.json();
    const task = await db.tasks.updateTask(id, body);
    
    return NextResponse.json(task);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche :', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID de tâche manquant' }, { status: 400 });
    }
    
    await db.tasks.deleteTask(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche :', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
```

#### 6. Utilisation de votre nouveau modèle dans les composants

Vous pouvez maintenant utiliser votre nouveau modèle dans vos composants :

```typescript
// Exemple : Récupération des tâches dans un composant serveur
import { db } from '@/app/[locale]/lib/db';

export default async function TaskList({ userId }: { userId: string }) {
  const tasks = await db.tasks.getTasksByUserId(userId);
  
  return (
    <div>
      <h2>Tâches</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.completed ? 'Terminée' : 'En cours'}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

Ou en utilisant les routes API dans les composants client :

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
      <h2>Tâches</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.completed ? 'Terminée' : 'En cours'}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

Cette approche modulaire vous permet d'ajouter facilement de nouveaux modèles de données et gestionnaires à votre application tout en maintenant une base de code propre et organisée.

## Internationalisation

Le boilerplate prend en charge plusieurs langues avec next-intl.

### Langues prises en charge

- Anglais (en) - par défaut
- Français (fr)
- Coréen (kr)

### Ajout de traductions

1. Les traductions sont stockées dans des fichiers JSON dans le répertoire `messages`
2. Ajoutez ou modifiez les traductions dans les fichiers de langue respectifs :
   - `messages/en.json`
   - `messages/fr.json`
   - `messages/kr.json`

### Utilisation des traductions

Dans les composants client :
```jsx
'use client';
import { useTranslations } from 'next-intl';

export default function MonComposant() {
  const t = useTranslations('namespace');
  return <div>{t('key')}</div>;
}
```

Dans les composants serveur :
```jsx
import { getTranslations } from 'next-intl/server';

export default async function MonComposantServeur() {
  const t = await getTranslations('namespace');
  return <div>{t('key')}</div>;
}
```

### Navigation avec les locales

Utilisez les utilitaires de navigation personnalisés de `@/navigation` au lieu de la navigation Next.js :

```jsx
import { Link, useRouter } from '@/navigation';

// Pour les liens
<Link href="/tableau-de-bord">Tableau de bord</Link>

// Pour la navigation programmatique
const router = useRouter();
router.push('/tableau-de-bord');
```

### Structure des locales

L'application suit les conventions du App Router de Next.js pour l'internationalisation :

1. Toutes les pages et composants localisés sont placés dans le répertoire `src/app/[locale]/`
2. Les routes API sont placées dans le répertoire `src/app/api/` (en dehors de la structure des locales)
3. Le middleware gère la redirection des utilisateurs vers leur locale préférée

## Tableau de bord administrateur

Le boilerplate inclut un tableau de bord d'administration complet pour la gestion des utilisateurs et des paramètres de l'application.

### Fonctionnalités d'administration

- Gestion des utilisateurs (affichage, création, mise à jour, suppression des utilisateurs)
- Contrôle d'accès basé sur les rôles
- Interface d'administration localisée

### Routes d'administration

Le tableau de bord d'administration est accessible à `/admin` et est protégé par l'authentification. Seuls les utilisateurs disposant de privilèges d'administrateur peuvent y accéder.

### Composants d'administration

Le tableau de bord d'administration est construit avec des composants réutilisables situés dans `src/app/[locale]/admin/components/` :

- `UserList.tsx` : Composant pour afficher et gérer les utilisateurs
- `AdminNav.tsx` : Composant de navigation pour le tableau de bord d'administration
- `AdminLayout.tsx` : Composant de mise en page pour le tableau de bord d'administration

### Ajout de fonctionnalités d'administration

Pour ajouter de nouvelles fonctionnalités au tableau de bord d'administration :

1. Créez un nouveau composant dans `src/app/[locale]/admin/components/`
2. Ajoutez le composant à la page appropriée dans `src/app/[locale]/admin/`
3. Ajoutez les routes API nécessaires dans `src/app/api/admin/`

## Routes API

Le boilerplate utilise les routes API de Next.js pour les opérations côté serveur. Avec Next.js 15, les gestionnaires de routes API ont été mis à jour pour gérer les paramètres dynamiques en tant que Promesses.

### Structure des routes API

Les routes API sont situées dans le répertoire `src/app/api/` (en dehors de la structure des locales) pour garantir qu'elles sont accessibles quelle que soit la locale de l'utilisateur.

### Création de routes API

Pour créer une nouvelle route API :

1. Créez un nouveau fichier dans le répertoire `src/app/api/`, par exemple, `src/app/api/tasks/route.ts`
2. Implémentez les fonctions de gestionnaire pour les méthodes HTTP dont vous avez besoin (GET, POST, PUT, DELETE)

Exemple de route API compatible avec Next.js 15 :

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/tasks
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<any> }
) {
  try {
    // Résoudre les paramètres s'il s'agit d'une Promesse
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
      return NextResponse.json({ error: 'Paramètre userId manquant' }, { status: 400 });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches :', error);
    return NextResponse.json({ error: 'Échec de la récupération des tâches' }, { status: 500 });
  }
}

// POST /api/tasks
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<any> }
) {
  try {
    // Résoudre les paramètres s'il s'agit d'une Promesse
    const resolvedParams = await params;
    
    const data = await request.json();
    
    // Valider les champs requis
    if (!data.title || !data.userId) {
      return NextResponse.json({ error: 'Le titre et l\'userId sont requis' }, { status: 400 });
    }
    
    // Créer une tâche dans la base de données
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
    console.error('Erreur lors de la création de la tâche :', error);
    return NextResponse.json({ error: 'Échec de la création de la tâche' }, { status: 500 });
  }
}
```

### Paramètres de route dynamiques

Pour les routes dynamiques comme `/api/tasks/[id]`, créez un répertoire avec le nom du paramètre entre crochets et un fichier `route.ts` à l'intérieur :

```
src/app/api/tasks/[id]/route.ts
```

Exemple de gestionnaire de route dynamique compatible avec Next.js 15 :

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/tasks/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<any> }
) {
  try {
    // Résoudre les paramètres s'il s'agit d'une Promesse
    const resolvedParams = await params;
    const taskId = resolvedParams.id;
    
    const task = await prisma.task.findUnique({
      where: { id: taskId }
    });
    
    if (!task) {
      return NextResponse.json({ error: 'Tâche non trouvée' }, { status: 404 });
    }
    
    return NextResponse.json(task);
  } catch (error) {
    console.error('Erreur lors de la récupération de la tâche :', error);
    return NextResponse.json({ error: 'Échec de la récupération de la tâche' }, { status: 500 });
  }
}

// PUT /api/tasks/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<any> }
) {
  try {
    // Résoudre les paramètres s'il s'agit d'une Promesse
    const resolvedParams = await params;
    const taskId = resolvedParams.id;
    
    const data = await request.json();
    
    const task = await prisma.task.update({
      where: { id: taskId },
      data
    });
    
    return NextResponse.json(task);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche :', error);
    return NextResponse.json({ error: 'Échec de la mise à jour de la tâche' }, { status: 500 });
  }
}

// DELETE /api/tasks/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<any> }
) {
  try {
    // Résoudre les paramètres s'il s'agit d'une Promesse
    const resolvedParams = await params;
    const taskId = resolvedParams.id;
    
    await prisma.task.delete({
      where: { id: taskId }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche :', error);
    return NextResponse.json({ error: 'Échec de la suppression de la tâche' }, { status: 500 });
  }
}
```

### Meilleures pratiques pour les routes API

1. Placez toujours les routes API dans le répertoire `src/app/api/` (en dehors de la structure des locales)
2. Gérez les paramètres comme une Promesse pour la compatibilité avec Next.js 15
3. Utilisez une gestion appropriée des erreurs et des codes d'état
4. Validez les données d'entrée avant le traitement
5. Utilisez Prisma pour les opérations de base de données

## Déploiement

Le boilerplate est optimisé pour le déploiement sur Vercel.

### Étapes de déploiement Vercel

1. Poussez votre code vers un dépôt Git (GitHub, GitLab ou Bitbucket)
2. Créez un compte Vercel sur [vercel.com](https://vercel.com)
3. Créez un nouveau projet et importez votre dépôt
4. Ajoutez toutes vos variables d'environnement de `.env.local` aux paramètres du projet Vercel
5. Déployez votre projet

### Variables d'environnement sur Vercel

1. Allez dans votre projet Vercel
2. Naviguez vers Paramètres > Variables d'environnement
3. Ajoutez toutes les variables d'environnement de votre fichier `.env.local`
4. Assurez-vous de mettre à jour `NEXT_PUBLIC_APP_URL` avec votre URL de production

### Domaines personnalisés

1. Dans votre projet Vercel, allez dans Paramètres > Domaines
2. Ajoutez votre domaine personnalisé
3. Suivez les instructions pour configurer les paramètres DNS

## Pour commencer

Pour exécuter le projet localement :

```bash
# Installer les dépendances
npm install

# Initialiser la base de données
npx prisma migrate dev --name init

# Lancer le serveur de développement
npm run dev
```

Visitez [http://localhost:3000](http://localhost:3000) pour voir votre application.

## Licence

Ce boilerplate est sous licence MIT.
