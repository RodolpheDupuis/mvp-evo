// app/profile/page.tsx
"use client";
import { useEffect, useState } from "react";
import { auth } from "@/app/[locale]/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/[locale]/components/ui/card";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  return (
    <Card className="max-w-lg mx-auto p-4">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">Email: <span className="font-semibold">{user.email}</span></p>
      </CardContent>
    </Card>
  );
}