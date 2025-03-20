"use client";

import RegisterForm from "@/app/[locale]/components/RegisterForm";
import { Link } from "~/navigation";
import { useLocale } from "next-intl";

interface RegisterPageContentProps {
  registerTitle: string;
  haveAccount: string;
  signIn: string;
}

export default function RegisterPageContent({ registerTitle, haveAccount, signIn }: RegisterPageContentProps) {
  const locale = useLocale();
  const loginPath = `/${locale}/login`;
  
  return (
    <div className="relative z-10 w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-3">
          MVP EVO
        </h1>
        <p className="text-white text-lg">{registerTitle}</p>
      </div>
      
      <RegisterForm />
      
      <div className="mt-8 text-center">
        <p className="text-white">
          {haveAccount}{" "}
          <Link href={loginPath} className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
            {signIn}
          </Link>
        </p>
      </div>
    </div>
  );
}
