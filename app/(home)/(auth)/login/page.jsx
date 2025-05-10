'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';



export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = decodeURIComponent(searchParams.get("redirect") || "");
  console.log("redirecct",redirect)


  // login function logic here
  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = false;
    
    // validation
    if (!email) {
      setEmailError('Email is required');
      error = true;
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setEmailError('Invalid Email');
      error = true;
    } else {
      setEmailError('');
    }
    if (!password) {
      setPasswordError('Password is required');
      error = true;
    } else {
      setPasswordError('');
    }
    if (error) return;

    setIsSubmitting(true);

    // sending data to the server to authenticate
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    
    if (res.error) {
      toast.error("Invalid Credentials")
      setIsSubmitting(false);
      return;
    }
    toast.success("Login successfull")
    // Fetch session to determine role
    const sessionRes = await fetch("/api/auth/session");
    const session = await sessionRes.json();
    const role = session?.user?.user?.role;

    //  Handle redirects with early return
    if (role === 1) {
      if (redirect && redirect.startsWith("/student")) {
        return router.push(redirect);
      }
      return router.push("/student");
    }

    if (role === 2) {
      return router.push("/instructor");
    }

    if (role === 3) {
      return router.push("/admin");
    }

    setIsSubmitting(false);
    return router.push("/");

  };

  return (
    <div className=" flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-[#0f0d23] rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-36 skillexa-gradient p-8">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white dark:bg-dark-card rounded-full p-4 shadow-lg">
              <LogIn className="w-8 h-8 text-custom-gradient-start dark:text-violet-400" />
            </div>
            <h1 className="text-white text-3xl font-bold text-center">Welcome Back</h1>
            <p className="text-blue-200 text-center mt-2">Please sign in to continue</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 pt-16 space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  autoComplete='username'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    "w-full pl-10 pr-4 py-2 border rounded-lg outline-none",
                    "bg-gray-50 dark:bg-[#0f0d23]/50 border-gray-300 dark:border-gray-700",
                    "text-gray-900 dark:text-white",
                    "focus:ring-2 focus:ring-blue-500 dark:focus:ring-violet-500 focus:border-transparent",
                    "transition-colors duration-200"
                  )}
                  placeholder="Enter your email"
                />
              </div>
              {emailError && <span className="text-red-600 text-sm cursor-pointer">*{emailError}</span>}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-violet-600 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300 transition-colors duration-200"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                  id="password"
                  type="password"
                  autoComplete='current-password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(
                    "w-full pl-10 pr-4 py-2 border rounded-lg outline-none",
                    "bg-gray-50 dark:bg-[#0f0d23]/50 border-gray-300 dark:border-gray-700",
                    "text-gray-900 dark:text-white",
                    "focus:ring-2 focus:ring-violet-500 focus:border-transparent",
                    "transition-colors duration-200"
                  )}
                  placeholder="Enter your password"
                />
              </div>
              {passwordError && <span className="text-red-600 text-sm cursor-pointer">*{passwordError}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full py-3 px-4 rounded-lg",
                "skillexa-gradient",
                "text-white font-medium",
                "hover:opacity-90",
                "transform transition-all duration-200",
                "hover:scale-[1.02]",
                "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2",
                "dark:focus:ring-offset-dark-card"
              )}
            >
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-full animate-spin" /> : "Sign In"}
            </button>

            

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-[#0f0d23] text-gray-500 dark:text-gray-400">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => signIn("google")}
              className={cn(
                "w-full py-3 px-4 rounded-lg",
                "bg-white dark:bg-[#0f0d23]/50",
                "border border-gray-300 dark:border-gray-700",
                "text-gray-700 dark:text-gray-300 font-medium",
                "hover:bg-gray-50 dark:hover:bg-dark-card",
                "transform transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2",
                "dark:focus:ring-offset-dark-card"
              )}
            >
              <div className="flex items-center justify-center">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
                Sign in with Google
              </div>
            </button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link
                href="/register/student"
                className="font-medium text-violet-600 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}