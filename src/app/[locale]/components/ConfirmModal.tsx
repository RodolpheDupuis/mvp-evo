// components/ConfirmModal.tsx
"use client";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/app/[locale]/components/ui/dialog";
import { Button } from "@/app/[locale]/components/ui/button";

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, description }: { isOpen: boolean, onClose: () => void, onConfirm: () => void, title: string, description: string }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p className="text-gray-700">{description}</p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}