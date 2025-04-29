import { LoginForm } from "@/components/login-form";
import { Logo } from "@/components/logo";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Logo className="h-16 w-auto" />
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter your credentials to access the ticketing system
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
