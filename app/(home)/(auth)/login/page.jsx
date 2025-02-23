'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    // sending data to the server 
    setError(false); // Reset error before request
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log(response);
      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json();
      console.log("Login Successful:", data);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }

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
          {error && <span className="text-red-600 text-sm cursor-pointer">*Invalid Credentials</span>}
          {isLoading && <span className="text-blue-600 text-sm cursor-pointer">Loading...</span>}
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
              Sign In
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