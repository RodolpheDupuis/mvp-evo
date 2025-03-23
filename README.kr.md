# MVP EVO - Next.js 보일러플레이트

인증, 결제 처리, 국제화 등을 갖춘 현대적이고 기능이 풍부한 Next.js 보일러플레이트입니다.

## 기능

- **인증**: Firebase + NextAuth 통합
- **결제 처리**: Stripe 및 LemonSqueezy 통합
- **데이터베이스**: PostgreSQL과 Prisma ORM
- **UI**: TailwindCSS와 shadcn/ui 컴포넌트
- **국제화**: next-intl을 사용한 완전한 i18n 지원 (영어, 프랑스어, 한국어)
- **관리자 대시보드**: 사용자 관리를 위한 완전한 관리자 인터페이스
- **배포**: Vercel 배포에 최적화

## 구성 가이드

이 문서는 MVP EVO 보일러플레이트의 모든 측면을 프로젝트 요구 사항에 맞게 구성하는 방법을 안내합니다.

## 목차

1. [환경 변수](#환경-변수)
2. [인증 설정](#인증-설정)
3. [결제 처리](#결제-처리)
4. [데이터베이스 구성](#데이터베이스-구성)
5. [UI 커스터마이징](#ui-커스터마이징)
6. [국제화](#국제화)
7. [관리자 대시보드](#관리자-대시보드)
8. [API 라우트](#api-라우트)
9. [배포](#배포)

## 환경 변수

프로젝트 루트에 다음 변수가 포함된 `.env.local` 파일을 생성하세요:

```
# Firebase Admin SDK
FIREBASE_ADMIN_KEY={"type":"service_account","project_id":"귀하의_PROJECT_ID",...}

# NextAuth
NEXTAUTH_SECRET=안전한-무작위-next-auth-키

# Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY=귀하의-firebase-api-키
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=귀하의-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=귀하의-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=귀하의-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=귀하의-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=귀하의-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=귀하의-measurement-id

# 이메일 (Resend)
NEXT_PUBLIC_RESEND_API_KEY=귀하의-resend-api-키

# 결제 처리
NEXT_PUBLIC_STRIPE_SECRET_KEY=귀하의-stripe-secret-키
NEXT_PUBLIC_LEMONSQUEEZY_API_KEY=귀하의-lemonsqueezy-api-키
NEXT_PUBLIC_USE_STRIPE=true  # LemonSqueezy를 사용하려면 false로 설정
NEXT_PUBLIC_APP_URL=http://localhost:3000  # 프로덕션에서는 프로덕션 URL로 변경

# 데이터베이스
DATABASE_URL="postgresql://사용자이름:비밀번호@localhost:5432/데이터베이스이름?schema=public"
```

## 인증 설정

이 보일러플레이트는 원활한 인증 경험을 위해 Firebase 인증과 NextAuth.js를 통합합니다.

### Firebase 설정

1. [firebase.google.com](https://firebase.google.com)에서 Firebase 프로젝트 생성
2. Firebase 프로젝트에서 인증 활성화
3. 이메일/비밀번호를 로그인 방법으로 추가
4. Firebase 프로젝트에서 웹 앱 생성
5. Firebase 구성 값을 `.env.local` 파일에 복사

### Firebase Admin SDK 설정

1. Firebase 프로젝트 설정 > 서비스 계정으로 이동
2. "새 비공개 키 생성"을 클릭하여 서비스 계정 키 다운로드
3. JSON 파일 내용을 한 줄로 변환하고 `.env.local` 파일의 `FIREBASE_ADMIN_KEY`로 추가

### NextAuth 구성

1. `NEXTAUTH_SECRET`을 위한 안전한 무작위 문자열 생성:
   ```bash
   openssl rand -base64 32
   ```
2. 생성된 문자열을 `.env.local` 파일에 추가

인증 시스템은 이미 다음과 같이 구성되어 있습니다:
- 인증에 Firebase 사용
- Prisma를 통해 사용자 데이터를 PostgreSQL 데이터베이스와 동기화
- NextAuth.js로 사용자 세션 관리

## 결제 처리

보일러플레이트는 결제 처리를 위해 Stripe와 LemonSqueezy를 모두 지원합니다.

### Stripe 구성

1. [stripe.com](https://stripe.com)에서 Stripe 계정 생성
2. Stripe 대시보드에서 API 키 가져오기
3. Stripe 비밀 키를 `.env.local` 파일의 `NEXT_PUBLIC_STRIPE_SECRET_KEY`에 추가
4. Stripe 대시보드에서 제품 및 가격 생성
5. 애플리케이션에서 제품 ID 또는 가격 ID 사용

Stripe 통합에는 다음이 포함됩니다:
- 결제 세션 생성
- 로케일 지원이 포함된 성공 및 취소 URL 처리
- 제품 및 가격 처리

### LemonSqueezy 구성

1. [lemonsqueezy.com](https://lemonsqueezy.com)에서 LemonSqueezy 계정 생성
2. LemonSqueezy 대시보드에서 API 키 가져오기
3. LemonSqueezy API 키를 `.env.local` 파일의 `NEXT_PUBLIC_LEMONSQUEEZY_API_KEY`에 추가
4. `src/lib/lemonsqueezy.ts`의 `STORE_ID` 및 `DEFAULT_VARIANT_ID`를 자신의 값으로 업데이트

결제 프로세서 간 전환을 위해 `NEXT_PUBLIC_USE_STRIPE`를 Stripe의 경우 `true`로, LemonSqueezy의 경우 `false`로 설정하세요.

## 데이터베이스 구성

보일러플레이트는 데이터베이스 관리를 위해 PostgreSQL과 Prisma ORM을 사용합니다.

### PostgreSQL 설정

1. 로컬 머신에 PostgreSQL을 설치하거나 클라우드 제공업체 사용
2. 프로젝트를 위한 새 데이터베이스 생성
3. `.env.local` 파일의 `DATABASE_URL`을 데이터베이스 연결 문자열로 업데이트

### Prisma 구성

Prisma 스키마는 다음 모델을 포함하여 `prisma/schema.prisma`에 이미 구성되어 있습니다:
- User (사용자)
- Profile (프로필)
- Account (계정)
- Session (세션)
- VerificationToken (인증 토큰)

데이터베이스 초기화:

```bash
npx prisma migrate dev --name init
```

스키마 변경 후 데이터베이스 업데이트:

```bash
npx prisma migrate dev --name 마이그레이션-이름
```

### 데이터베이스 상호작용

보일러플레이트는 다음 위치에 데이터베이스 상호작용을 위한 유틸리티 함수를 포함합니다:
- `src/app/[locale]/lib/prisma.ts`: Prisma 클라이언트 초기화
- `src/app/[locale]/lib/userSync.ts`: Firebase와 PostgreSQL 간 사용자 동기화

이러한 유틸리티는 다음을 위한 메서드를 제공합니다:
- 사용자 생성 및 업데이트
- Firebase 사용자와 데이터베이스 동기화
- 사용자 프로필 관리

### 커스텀 데이터 모델 및 핸들러 추가하기

이 보일러플레이트는 데이터베이스 관리를 위한 모듈식 접근 방식을 따릅니다. 다음은 자신만의 데이터 모델과 핸들러를 추가하는 방법입니다:

#### 1. Prisma 스키마에 새 모델 정의하기

`prisma/schema.prisma` 파일에 새 모델을 추가하세요:

```prisma
// 예시: 새로운 Task(작업) 모델 추가
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

User 모델을 업데이트하여 관계를 포함하는 것을 잊지 마세요:

```prisma
model User {
  // 기존 필드...
  tasks        Task[]
}
```

#### 2. Prisma 마이그레이션 실행하기

모델을 정의한 후 마이그레이션을 생성하고 적용하세요:

```bash
npx prisma migrate dev --name add_tasks_model
```

#### 3. 핸들러 파일 생성하기

`src/app/[locale]/lib/db/` 디렉토리에 새 핸들러 파일을 생성하세요:

```typescript
// src/app/[locale]/lib/db/tasks.ts
import { prisma } from '../prisma';
import type { Task } from '@prisma/client';

// 새 작업 생성
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
    console.error('작업 생성 오류:', error);
    throw error;
  }
}

// 사용자 ID로 작업 가져오기
export async function getTasksByUserId(userId: string) {
  try {
    return await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('작업 가져오기 오류:', error);
    throw error;
  }
}

// ID로 작업 가져오기
export async function getTaskById(id: string) {
  try {
    return await prisma.task.findUnique({
      where: { id }
    });
  } catch (error) {
    console.error('작업 가져오기 오류:', error);
    throw error;
  }
}

// 작업 업데이트
export async function updateTask(id: string, taskData: Partial<Task>) {
  try {
    return await prisma.task.update({
      where: { id },
      data: taskData
    });
  } catch (error) {
    console.error('작업 업데이트 오류:', error);
    throw error;
  }
}

// 작업 삭제
export async function deleteTask(id: string) {
  try {
    return await prisma.task.delete({
      where: { id }
    });
  } catch (error) {
    console.error('작업 삭제 오류:', error);
    throw error;
  }
}
```

#### 4. 데이터베이스 인덱스 파일 업데이트하기

`src/app/[locale]/lib/db/index.ts` 파일을 업데이트하여 새 핸들러를 포함하세요:

```typescript
import * as userDb from './users';
import * as profileDb from './profiles';
import * as sessionDb from './sessions';
import * as accountDb from './accounts';
import * as taskDb from './tasks'; // 이 줄 추가

export const db = {
  users: userDb,
  profiles: profileDb,
  sessions: sessionDb,
  accounts: accountDb,
  tasks: taskDb // 이 줄 추가
};

export default db;
```

#### 5. 모델에 대한 API 라우트 생성하기

`src/app/[locale]/api/tasks/route.ts`에 API 라우트를 생성하세요:

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
        return NextResponse.json({ error: '작업을 찾을 수 없습니다' }, { status: 404 });
      }
      return NextResponse.json(task);
    } else if (userId) {
      const tasks = await db.tasks.getTasksByUserId(userId);
      return NextResponse.json(tasks);
    } else {
      return NextResponse.json({ error: '쿼리 매개변수가 누락되었습니다' }, { status: 400 });
    }
  } catch (error) {
    console.error('작업 가져오기 오류:', error);
    return NextResponse.json({ error: '서버 내부 오류' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const task = await db.tasks.createTask(body);
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('작업 생성 오류:', error);
    return NextResponse.json({ error: '서버 내부 오류' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: '작업 ID가 누락되었습니다' }, { status: 400 });
    }
    
    const body = await request.json();
    const task = await db.tasks.updateTask(id, body);
    
    return NextResponse.json(task);
  } catch (error) {
    console.error('작업 업데이트 오류:', error);
    return NextResponse.json({ error: '서버 내부 오류' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: '작업 ID가 누락되었습니다' }, { status: 400 });
    }
    
    await db.tasks.deleteTask(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('작업 삭제 오류:', error);
    return NextResponse.json({ error: '서버 내부 오류' }, { status: 500 });
  }
}
```

#### 6. 컴포넌트에서 새 모델 사용하기

이제 컴포넌트에서 새 모델을 사용할 수 있습니다:

```typescript
// 예시: 서버 컴포넌트에서 작업 가져오기
import { db } from '@/app/[locale]/lib/db';

export default async function TaskList({ userId }: { userId: string }) {
  const tasks = await db.tasks.getTasksByUserId(userId);
  
  return (
    <div>
      <h2>작업</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.completed ? '완료' : '진행 중'}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

또는 클라이언트 컴포넌트에서 API 라우트 사용하기:

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
      <h2>작업</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.completed ? '완료' : '진행 중'}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

이 모듈식 접근 방식을 통해 깔끔하고 체계적인 코드베이스를 유지하면서 애플리케이션에 새로운 데이터 모델과 핸들러를 쉽게 추가할 수 있습니다.

## 국제화

이 보일러플레이트는 next-intl을 사용하여 여러 언어를 지원합니다.

### 지원 언어

- 영어 (en) - 기본값
- 프랑스어 (fr)
- 한국어 (kr)

### 번역 추가

1. 번역은 `messages` 디렉토리의 JSON 파일에 저장됩니다
2. 각 언어 파일에서 번역을 추가하거나 수정하세요:
   - `messages/en.json`
   - `messages/fr.json`
   - `messages/kr.json`

### 번역 사용

클라이언트 컴포넌트에서:
```jsx
'use client';
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('namespace');
  return <div>{t('key')}</div>;
}
```

서버 컴포넌트에서:
```jsx
import { getTranslations } from 'next-intl/server';

export default async function MyServerComponent() {
  const t = await getTranslations('namespace');
  return <div>{t('key')}</div>;
}
```

### 로케일을 사용한 네비게이션

Next.js 네비게이션 대신 `@/navigation`의 커스텀 네비게이션 유틸리티를 사용하세요:

```jsx
import { Link, useRouter } from '@/navigation';

// 링크용
<Link href="/dashboard">대시보드</Link>

// 프로그래밍 방식 네비게이션
const router = useRouter();
router.push('/dashboard');
```

### 로케일 구조

애플리케이션은 국제화를 위한 Next.js App Router 규칙을 따릅니다:

1. 모든 지역화된 페이지와 컴포넌트는 `src/app/[locale]/` 디렉토리에 위치합니다
2. API 라우트는 `src/app/api/` 디렉토리에 위치합니다 (로케일 구조 외부)
3. 미들웨어는 사용자를 선호하는 로케일로 리디렉션하는 역할을 합니다

## 관리자 대시보드

이 보일러플레이트는 사용자 및 애플리케이션 설정 관리를 위한 완전한 관리자 대시보드를 포함합니다.

### 관리자 기능

- 사용자 관리 (사용자 보기, 생성, 업데이트, 삭제)
- 역할 기반 접근 제어
- 지역화된 관리자 인터페이스

### 관리자 라우트

관리자 대시보드는 `/admin`에서 접근 가능하며 인증으로 보호됩니다. 관리자 권한이 있는 사용자만 접근할 수 있습니다.

### 관리자 컴포넌트

관리자 대시보드는 `src/app/[locale]/admin/components/`에 위치한 재사용 가능한 컴포넌트로 구성되어 있습니다:

- `UserList.tsx`: 사용자 표시 및 관리를 위한 컴포넌트
- `AdminNav.tsx`: 관리자 대시보드용 네비게이션 컴포넌트
- `AdminLayout.tsx`: 관리자 대시보드용 레이아웃 컴포넌트

### 관리자 기능 추가

관리자 대시보드에 새로운 기능을 추가하려면:

1. `src/app/[locale]/admin/components/`에 새 컴포넌트 생성
2. `src/app/[locale]/admin/`의 적절한 페이지에 컴포넌트 추가
3. `src/app/api/admin/`에 필요한 API 라우트 추가

## API 라우트

이 보일러플레이트는 서버 측 작업을 위해 Next.js API 라우트를 사용합니다. Next.js 15에서는 API 라우트 핸들러가 동적 매개변수를 Promise로 처리하도록 업데이트되었습니다.

### API 라우트 구조

API 라우트는 사용자의 로케일에 관계없이 접근 가능하도록 `src/app/api/` 디렉토리(로케일 구조 외부)에 위치합니다.

### API 라우트 생성

새 API 라우트를 생성하려면:

1. `src/app/api/` 디렉토리에 새 파일 생성 (예: `src/app/api/tasks/route.ts`)
2. 필요한 HTTP 메서드(GET, POST, PUT, DELETE)에 대한 핸들러 함수 구현

Next.js 15와 호환되는 API 라우트 예제:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/tasks
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<any> }
) {
  try {
    // Promise인 경우 매개변수 해결
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
      return NextResponse.json({ error: 'userId 매개변수가 누락되었습니다' }, { status: 400 });
    }
  } catch (error) {
    console.error('작업 검색 중 오류 발생:', error);
    return NextResponse.json({ error: '작업 검색 실패' }, { status: 500 });
  }
}

// POST /api/tasks
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<any> }
) {
  try {
    // Promise인 경우 매개변수 해결
    const resolvedParams = await params;
    
    const data = await request.json();
    
    // 필수 필드 검증
    if (!data.title || !data.userId) {
      return NextResponse.json({ error: '제목과 userId가 필요합니다' }, { status: 400 });
    }
    
    // 데이터베이스에 작업 생성
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
    console.error('작업 생성 중 오류 발생:', error);
    return NextResponse.json({ error: '작업 생성 실패' }, { status: 500 });
  }
}
```

### 동적 라우트 매개변수

`/api/tasks/[id]`와 같은 동적 라우트의 경우, 대괄호 안에 매개변수 이름이 있는 디렉토리를 만들고 그 안에 `route.ts` 파일을 생성합니다:

```
src/app/api/tasks/[id]/route.ts
```

Next.js 15와 호환되는 동적 라우트 핸들러 예제:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/tasks/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<any> }
) {
  try {
    // Promise인 경우 매개변수 해결
    const resolvedParams = await params;
    const taskId = resolvedParams.id;
    
    const task = await prisma.task.findUnique({
      where: { id: taskId }
    });
    
    if (!task) {
      return NextResponse.json({ error: '작업을 찾을 수 없습니다' }, { status: 404 });
    }
    
    return NextResponse.json(task);
  } catch (error) {
    console.error('작업 검색 중 오류 발생:', error);
    return NextResponse.json({ error: '작업 검색 실패' }, { status: 500 });
  }
}

// PUT /api/tasks/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<any> }
) {
  try {
    // Promise인 경우 매개변수 해결
    const resolvedParams = await params;
    const taskId = resolvedParams.id;
    
    const data = await request.json();
    
    const task = await prisma.task.update({
      where: { id: taskId },
      data
    });
    
    return NextResponse.json(task);
  } catch (error) {
    console.error('작업 업데이트 중 오류 발생:', error);
    return NextResponse.json({ error: '작업 업데이트 실패' }, { status: 500 });
  }
}

// DELETE /api/tasks/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<any> }
) {
  try {
    // Promise인 경우 매개변수 해결
    const resolvedParams = await params;
    const taskId = resolvedParams.id;
    
    await prisma.task.delete({
      where: { id: taskId }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('작업 삭제 중 오류 발생:', error);
    return NextResponse.json({ error: '작업 삭제 실패' }, { status: 500 });
  }
}
```

### API 라우트 모범 사례

1. API 라우트는 항상 `src/app/api/` 디렉토리(로케일 구조 외부)에 배치
2. Next.js 15와의 호환성을 위해 매개변수를 Promise로 처리
3. 적절한 오류 처리 및 상태 코드 사용
4. 처리 전 입력 데이터 검증
5. 데이터베이스 작업에 Prisma 사용

## UI 커스터마이징

### TailwindCSS

보일러플레이트는 스타일링을 위해 TailwindCSS를 사용합니다. 구성은 `tailwind.config.ts`에 있습니다.

커스터마이징 방법:
1. `tailwind.config.ts`의 `theme` 섹션 수정
2. `src/app/globals.css`에 사용자 정의 CSS 추가

### shadcn/ui

보일러플레이트는 고품질 UI 컴포넌트를 위해 shadcn/ui를 통합합니다. 구성은 `components.json`에 있습니다.

새 컴포넌트 추가:

```bash
npx shadcn-ui add button
```

테마 커스터마이징:
1. `components.json`의 `style` 수정 (기본값은 "new-york")
2. `components.json`의 `baseColor` 업데이트

## 배포

보일러플레이트는 Vercel 배포에 최적화되어 있습니다.

### Vercel 배포 단계

1. 코드를 Git 저장소(GitHub, GitLab 또는 Bitbucket)에 푸시
2. [vercel.com](https://vercel.com)에서 Vercel 계정 생성
3. 새 프로젝트 생성 및 저장소 가져오기
4. `.env.local`의 모든 환경 변수를 Vercel 프로젝트 설정에 추가
5. 프로젝트 배포

### Vercel의 환경 변수

1. Vercel 프로젝트로 이동
2. 설정 > 환경 변수로 이동
3. `.env.local` 파일의 모든 환경 변수 추가
4. `NEXT_PUBLIC_APP_URL`을 프로덕션 URL로 업데이트

### 사용자 정의 도메인

1. Vercel 프로젝트에서 설정 > 도메인으로 이동
2. 사용자 정의 도메인 추가
3. DNS 설정 구성 지침 따르기

## 시작하기

로컬에서 프로젝트 실행:

```bash
# 의존성 설치
npm install

# 데이터베이스 초기화
npx prisma migrate dev --name init

# 개발 서버 실행
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인하세요.

## 라이선스

이 보일러플레이트는 MIT 라이선스 하에 제공됩니다.
