// app/success/page.tsx
export default function SuccessPage() {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
        <p className="mt-2">Thank you for your purchase. You can now access your content.</p>
      </div>
    );
  }