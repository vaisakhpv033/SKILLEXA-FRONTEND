'use client';
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Shield, User2 } from 'lucide-react';
import ProfileTab from './ProfileTab';
import { SecurityTab } from './SecurityTab';
import SocialTab from './SocialTab';
import { UserCircle2, Loader2 } from 'lucide-react';

const initialUser = {
  first_name: '',
  last_name: '',
  username: '',
  designation: '',
  description: "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&auto=format&fit=crop&q=80',
  socials: [
    { platform: 'linkedin', url: 'https://linkedin.com/in/johndoe' },
    { platform: 'instagram', url: 'https://instagram.com/johndoe' },
  ],
};

export default function UserProfile() {
  const [user, setUser] = useState(initialUser);
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
        <div className='container max-w-4xl mx-auto p-4 py-8'>
            <div className='flex item-center justify-center'>
                <Loader2 className="mr-2 h-12 w-12 mt-2 animate-spin" />
            </div>
        </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto p-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your profile and preferences</p>
        </div>
        <Avatar className="h-12 w-12 ring-2 ring-primary/10">
          <AvatarImage src={user.avatar} alt={user.first_name} />
          <AvatarFallback>
            <User2 className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
      </div>

      <Tabs defaultValue="profile" className="w-full space-y-6">
        <TabsList className="w-full grid grid-cols-3 lg:w-auto">
            <TabsTrigger className="flex items-center gap-2" value="profile">
                <UserCircle2 className="h-4 w-4" />
                Profile
            </TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger className="flex items-center gap-2" value="security">
                <Shield className='h-4 w-4' />
                Security
            </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileTab user={user} setUser={setUser} />
        </TabsContent>
        <TabsContent value="social">
          <SocialTab user={user} setUser={setUser} />
        </TabsContent>
        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}


