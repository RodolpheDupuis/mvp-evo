// components/Navbar.tsx
"use client";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Toaster } from "@/app/components/ui/sonner";
import { toast } from "sonner"; 

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out", {
      description: "You have been successfully logged out."
    });
    router.push("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <Toaster />
      <h1 className="text-xl font-bold">MVP Dashboard</h1>
      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </nav>
  );
}