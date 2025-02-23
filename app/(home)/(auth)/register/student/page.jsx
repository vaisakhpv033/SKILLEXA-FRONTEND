'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, UserPlus, AtSign } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RegisterStudent() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="bg-white dark:bg-[#0f0d23] rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-36 skillexa-gradient p-8">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white dark:bg-dark-card rounded-full p-4 shadow-lg">
              <UserPlus className="w-8 h-8 text-custom-gradient-start dark:text-custom-gradient-end" />
            </div>
            <h1 className="text-white text-3xl font-bold text-center">Create Account</h1>
            <p className="text-blue-200 text-center mt-2">Join our community today</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 pt-16 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={cn(
                      "w-full pl-10 pr-4 py-2 border rounded-lg outline-none",
                      "bg-gray-50 dark:bg-[#0f0d23]/50 border-gray-300 dark:border-gray-700",
                      "text-gray-900 dark:text-white",
                      "focus:ring-2 focus:ring-custom-gradient-start focus:border-transparent",
                      "transition-colors duration-200"
                    )}
                    placeholder="Enter your first name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={cn(
                      "w-full pl-10 pr-4 py-2 border rounded-lg outline-none",
                      "bg-gray-50 dark:bg-[#0f0d23]/50 border-gray-300 dark:border-gray-700",
                      "text-gray-900 dark:text-white",
                      "focus:ring-2 focus:ring-custom-gradient-start focus:border-transparent",
                      "transition-colors duration-200"
                    )}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Username
                </label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={cn(
                      "w-full pl-10 pr-4 py-2 border rounded-lg outline-none",
                      "bg-gray-50 dark:bg-[#0f0d23]/50 border-gray-300 dark:border-gray-700",
                      "text-gray-900 dark:text-white",
                      "focus:ring-2 focus:ring-custom-gradient-start focus:border-transparent",
                      "transition-colors duration-200"
                    )}
                    placeholder="Choose a username"
                    required
                  />
                </div>
              </div>

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
                      "focus:ring-2 focus:ring-custom-gradient-start focus:border-transparent",
                      "transition-colors duration-200"
                    )}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Password
                </label>
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
                      "focus:ring-2 focus:ring-custom-gradient-start focus:border-transparent",
                      "transition-colors duration-200"
                    )}
                    placeholder="Choose a password"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={cn(
                      "w-full pl-10 pr-4 py-2 border rounded-lg outline-none",
                      "bg-gray-50 dark:bg-[#0f0d23]/50 border-gray-300 dark:border-gray-700",
                      "text-gray-900 dark:text-white",
                      "focus:ring-2 focus:ring-custom-gradient-start focus:border-transparent",
                      "transition-colors duration-200"
                    )}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={cn(
                "w-full py-3 px-4 rounded-lg mt-8",
                "skillexa-gradient",
                "text-white font-medium",
                "hover:opacity-90",
                "transform transition-all duration-200",
                "hover:scale-[1.02]",
                "focus:outline-none focus:ring-2 focus:ring-custom-gradient-start focus:ring-offset-2",
                "dark:focus:ring-offset-dark-card"
              )}
            >
              Create Account
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
                "focus:outline-none focus:ring-2 focus:ring-custom-gradient-start focus:ring-offset-2",
                "dark:focus:ring-offset-dark-card"
              )}
            >
              <div className="flex items-center justify-center">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
                Sign up with Google
              </div>
            </button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-custom-gradient-start hover:text-custom-gradient-end dark:text-violet-400 dark:hover:text-violet-600"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}