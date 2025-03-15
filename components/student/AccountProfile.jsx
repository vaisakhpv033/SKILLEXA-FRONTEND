'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import { User2, Loader2 } from 'lucide-react';

export const AccountProfile= () => {
    const [user, setUser] = useState({});
    const [isLoading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const response = await fetch("/api/instructor/profile"); // Fetching from Next.js API route
          if (!response.ok) throw new Error("Failed to fetch user profile");
          const data = await response.json();
          setUser(data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserProfile();
    }, []);
  
    if (isLoading) {
      return (
          <div className='container max-w-6xl mx-auto p-4 py-8'>
              <div className='flex item-center justify-center'>
                  <Loader2 className="mr-2 h-12 w-12 mt-2 animate-spin" />
              </div>
          </div>
      )
    }
  return (
    <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
      <div className="space-y-4">
        <div className="flex space-x-4">
            <Avatar className="h-20 w-20 ring-2 ring-primary/10">
            <AvatarImage src={user.avatar} alt={user.first_name} />
            <AvatarFallback>
                <User2 className="h-10 w-10" />
            </AvatarFallback>
            </Avatar>
          <div>
            <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">
              {user.first_name} {user.last_name}
            </h2>
          </div>
        </div>
        
        <dl>
          <dt className="font-semibold text-gray-900 dark:text-white">Email Address</dt>
          <dd className="text-gray-500 dark:text-gray-400">{user?.email}</dd>
        </dl>

      </div>

      <div className="space-y-4">
        <dl>
          <dt className="font-semibold text-gray-900 dark:text-white">Phone Number</dt>
          <dd className="text-gray-500 dark:text-gray-400">{user.phone_number}</dd>
        </dl>

        <dl>
          <dt className="font-semibold text-gray-900 dark:text-white">About</dt>
          <dd className="text-gray-500 dark:text-gray-400">{user.bio}</dd>
        </dl>

      </div>
    </div>
  );
};