// app/(auth)/register/page.tsx
import RegisterForm from "@/app/[locale]/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div>
      <h1>Sign Up</h1>
      <RegisterForm />
    </div>
  );
}
