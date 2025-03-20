// app/cancel/page.tsx
export default function CancelPage() {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-600">Payment Canceled</h1>
        <p className="mt-2">Your payment was not completed. You can try again later.</p>
      </div>
    );
  }