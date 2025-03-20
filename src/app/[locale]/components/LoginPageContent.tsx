"use client";

import LoginForm from "@/app/[locale]/components/LoginForm";
import { Link } from "~/navigation";
import { useLocale } from "next-intl";

interface LoginPageContentProps {
  loginTitle: string;
  noAccount: string;
  signUp: string;
}

export default function LoginPageContent({ loginTitle, noAccount, signUp }: LoginPageContentProps) {
  const locale = useLocale();
  const registerPath = `/${locale}/register`;
  
  return (
    <div className="relative z-10 w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-3">
          MVP EVO
        </h1>
        <p className="text-white text-lg">{loginTitle}</p>
      </div>
      
      <LoginForm />
      
      <div className="mt-8 text-center">
        <p className="text-white">
          {noAccount}{" "}
          <Link href={registerPath} className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
            {signUp}
          </Link>
        </p>
      </div>
    </div>
  );
}
