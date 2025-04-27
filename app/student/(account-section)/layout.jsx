import React from "react";
import { StudentSidebar } from "@/components/student/StudentSidebar";
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import Link from "next/link";
import ModeToggle from "@/components/ModeToggle";
import { Bell, BookOpen, Heart, ShoppingCart } from "lucide-react";
import { NotificationSheet } from "@/components/student/NotificationSheet";

const AdminLayout = ({ children }) => {

    return (
            <SidebarProvider>
                <StudentSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 flex-between">
                        <div className="flex shrink-0 items-center gap-2">
                            <SidebarTrigger className="-ml-1" />
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                            <Link href="/student/my-learning">
                                <SidebarMenuButton><BookOpen/> <span className="max-md:hidden">My learning</span></SidebarMenuButton>
                            </Link>
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <Link href="/student/wishlist">
                                <SidebarMenuButton><Heart /></SidebarMenuButton>
                            </Link>                           
                            <Separator orientation='vertical' className="mr-2 h-4" />
                            <Link href="/student/cart">
                                <SidebarMenuButton><ShoppingCart /></SidebarMenuButton>
                            </Link>
                            <Separator orientation="vertical" className="mr-2 h-4" />
                                
                            <NotificationSheet />
                            
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <ModeToggle />
                        </div>
                    </header>

                    {children}

                </SidebarInset>
            </SidebarProvider>
    )
}

export default AdminLayout