'use client';
import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { signOut } from "next-auth/react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
              <SidebarMenuButton size="lg" onClick={() => signOut({ callbackUrl: "/login" })}>
                <LogOut />Sign Out
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
