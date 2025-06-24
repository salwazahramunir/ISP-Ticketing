import { LoginForm } from "@/components/login-form";
import { Logo } from "@/components/logo";
import ListNews from "@/components/news/list-news";
import MobilNewsSection from "@/components/news/mobile-news-section";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Desktop Left Side - News Cards */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-800 p-8 flex-col justify-center">
        <div className="max-w-lg mx-auto">
          <div className="mb-8">
            <Logo className="h-12 w-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Latest Updates
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Stay informed with the latest news and updates from our platform.
            </p>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            <ListNews />
          </div>
        </div>
      </div>

      {/* Mobile News Section - Collapsible */}
      <MobilNewsSection />

      {/* Right Side - Login Form */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center p-4 lg:p-8 bg-white dark:bg-gray-950 min-h-[60vh] lg:min-h-screen">
        <div className="w-full max-w-md space-y-6 lg:space-y-8">
          {/* Mobile Logo - Only shown on small screens when news is collapsed */}
          {/* <div className="flex flex-col items-center lg:hidden">
            <Logo className="h-12 lg:h-16 w-auto" />
            <h2 className="mt-3 lg:mt-4 text-center text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              ISP Ticketing System
            </h2>
          </div> */}

          {/* Login Form Section */}
          <div className="space-y-4 lg:space-y-6">
            <div className="text-center">
              <h2 className="hidden lg:block text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Welcome Back
              </h2>
              <h3 className="lg:hidden text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Welcome Back
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Enter your credentials to access the ticketing system
              </p>
            </div>

            <LoginForm />

            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Need help? Contact your system administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
