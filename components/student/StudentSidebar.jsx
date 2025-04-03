'use client';
import * as React from "react";
import { useState } from "react";
import { signOut } from "next-auth/react";


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { LogOut, Settings, Wallet, FileStack, CircleUserRound } from "lucide-react";


const data = {
  navMain: [
    {
      title: "Profile",
      url: "/student/profile",
      icon: <CircleUserRound />,
    },
    {
      title: "Purchase History",
      url: "/student/purchase-history",
      icon: <FileStack />,
    },
    {
      title: "Wallet",
      url:"/student/wallet",
      icon: <Wallet />
    },
    {
      title: "Settings",
      url: "/student/settings",
      icon: <Settings />
    },
  ],
};

export function StudentSidebar({ ...props }) {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const handleSignout = () => {
      setIsLoggingOut(true);
  
      signOut({ callbackUrl: "/login" })
      
    }
  return (
    <Sidebar {...props}>
      <SidebarHeader className="bg-background">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/student">
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="dark:text-white text-[26px] font-extrabold">SKILLEXA</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size="lg">
                    <Link className="font-medium" href={item.url}>{item.icon}{item.title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            ))}

            {/* Sign Out Button - Corrected */}
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" onClick={handleSignout}>
                <LogOut />Sign Out
                {isLoggingOut && <><div className="fixed cursor-wait z-50 top-0 h-screen w-full inset-0 bg-slate-500 dark:bg-transparent backdrop-blur-2xl bg-opacity-70 flex items-center justify-center"><p className='animate-pulse text-lg'>Signing Out...</p></div></>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
