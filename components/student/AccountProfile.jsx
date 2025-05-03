'use client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { User2, Loader2 } from 'lucide-react';

export const AccountProfile = () => {
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
      <div className="container max-w-6xl mx-auto p-4 py-8">
        <div className="flex items-center justify-center">
          <Loader2 className="mr-2 h-12 w-12 mt-2 animate-spin text-gray-700 dark:text-gray-300" />
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-full mx-auto p-6">
      {/* Unified Profile Card */}
      <Card className="shadow-sm bg-white/60 dark:bg-gray-800">
        <CardHeader className="flex items-center space-x-4">
          <Avatar className="h-24 w-24 ring-2 ring-primary/10">
            <AvatarImage src={user.avatar} alt={user.first_name} />
            <AvatarFallback>
              <User2 className="h-12 w-12 text-gray-500 dark:text-gray-300" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.first_name} {user.last_name}
            </CardTitle>
            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 mt-4">
          {/* Phone Number Section */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Phone Number</h4>
            <p className="text-gray-500 dark:text-gray-400">{user.phone_number || "N/A"}</p>
          </div>
          {/* About Section */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">About</h4>
            <p className="text-gray-500 dark:text-gray-400">{user.bio || "No bio available."}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};