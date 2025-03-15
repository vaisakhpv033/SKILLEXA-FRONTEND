'use client';
import * as React from "react";
import { GalleryVerticalEnd, Minus, Plus } from "lucide-react";
import { signOut } from "next-auth/react";
import { SearchForm } from "@/components/search-form";
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


const data = {
  navMain: [
    {
      title: "Users",
      items: [
        { title: "Students", url: "/admin/users/students" },
        { title: "Instructors", url: "/admin/users/instructors" },
      ],
    },
    {
      title: "Courses",
      items: [
        { title: "All Courses", url: "/admin/courses" },
        { title: "Category", url: "/admin/courses/categories"},
        { title: "Pending Approvals", url: "/admin/courses/pending" },
      ],
    },
    {
      title: "Coupon Management",
      items: [
        { title: "Create", url: "/admin/coupons/create" },
        { title: "All Coupons", url: "/admin/coupons" },
      ],
    },
    {
      title: "Revenue",
      items: [
        { title: "Order History", url: "/admin/revenue/orders" },
        { title: "Total Earnings", url: "/admin/revenue/total" },
        { title: "Instructor Earnings", url: "/admin/revenue/instructors" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin">
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="dark:text-white text-[26px] font-extrabold">SKILLEXA</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => (
              <Collapsible key={item.title}  className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={subItem.url}>{subItem.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}

            {/* Sign Out Button - Corrected */}
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => signOut({ callbackUrl: "/login" })}>
                Sign Out
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
