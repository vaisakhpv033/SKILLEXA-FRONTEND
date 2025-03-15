"use client";
import React from "react";
import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { usePathname } from "next/navigation";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import GlobalAuthHandler from "@/components/admin/GlobalAuthHandler";

const AdminLayout = ({ children }) => {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);

    return (
        <SessionProvider >
            <GlobalAuthHandler >
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset>
                        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink asChild>
                                            <Link href="/admin">Admin</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    {pathSegments.slice(1).map((segment, index) => {
                                        const href = `/admin/${pathSegments.slice(1, index + 2).join("/")}`;
                                        const isLast = index === pathSegments.length - 2;
                                        return (
                                            <React.Fragment key={segment}>
                                                <BreadcrumbSeparator />
                                                <BreadcrumbItem>
                                                    {isLast ? (
                                                        <BreadcrumbPage>{segment}</BreadcrumbPage>
                                                    ) : (
                                                        <BreadcrumbLink asChild>
                                                            <Link href={href}>{segment}</Link>
                                                        </BreadcrumbLink>
                                                    )}
                                                </BreadcrumbItem>
                                            </React.Fragment>
                                        );
                                    })}

                                </BreadcrumbList>
                            </Breadcrumb>
                        </header>

                        {children}

                    </SidebarInset>
                </SidebarProvider>
            </GlobalAuthHandler>
        </SessionProvider>
    )
}

export default AdminLayout