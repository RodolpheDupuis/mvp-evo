// app/settings/page.tsx
"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import ConfirmModal from "@/app/components/ConfirmModal";
import { Toaster } from "@/app/components/ui/sonner";
import { toast } from "sonner";

export default function SettingsPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDeleteAccount = () => {
    toast.success("Account deleted", {
        description: "Your account has been successfully deleted."
      });
    setModalOpen(false);
  };

  return (
    <Card className="max-w-lg mx-auto p-4">
      <Toaster />
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">Manage your application settings here.</p>
        <Button variant="destructive" className="mt-4" onClick={() => setModalOpen(true)}>
          Delete Account
        </Button>
        <ConfirmModal 
          isOpen={isModalOpen} 
          onClose={() => setModalOpen(false)}
          onConfirm={handleDeleteAccount}
          title="Confirm Account Deletion"
          description="Are you sure you want to delete your account? This action cannot be undone."
        />
      </CardContent>
    </Card>
  );
}