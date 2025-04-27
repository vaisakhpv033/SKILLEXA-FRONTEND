'use client'
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { ScrollArea } from "../ui/scroll-area"

const notifications = [
    {
      id: 1,
      notification: {
        title: "New Message",
        body: "You received a new message from John Doe."
      },
      is_read: false,
      created_at: "2025-04-22T14:30:00"
    },
    {
      id: 2,
      notification: {
        title: "Payment Successful",
        body: "Your subscription payment for April has been processed."
      },
      is_read: true,
      created_at: "2025-04-21T09:15:00"
    },
    {
      id: 3,
      notification: {
        title: "New Comment",
        body: "Anna commented on your post: 'Great insights!'"
      },
      is_read: false,
      created_at: "2025-04-20T16:00:00"
    },
    {
        id: 4,
        notification: {
          title: "New Message",
          body: "You received a new message from John Doe."
        },
        is_read: false,
        created_at: "2025-04-22T14:30:00"
      },
      
      {
        id: 5,
        notification: {
          title: "Payment Successful",
          body: "Your subscription payment for April has been processed."
        },
        is_read: true,
        created_at: "2025-04-21T09:15:00"
      },
      {
        id: 6,
        notification: {
          title: "New Comment",
          body: "Anna commented on your post: 'Great insights!'"
        },
        is_read: false,
        created_at: "2025-04-20T16:00:00"
      },
      {
        id: 7,
        notification: {
          title: "New Message",
          body: "You received a new message from John Doe."
        },
        is_read: false,
        created_at: "2025-04-22T14:30:00"
      },
      {
        id: 8,
        notification: {
          title: "Payment Successful",
          body: "Your subscription payment for April has been processed."
        },
        is_read: true,
        created_at: "2025-04-21T09:15:00"
      },
      {
        id: 9,
        notification: {
          title: "New Comment",
          body: "Anna commented on your post: 'Great insights!'"
        },
        is_read: false,
        created_at: "2025-04-20T16:00:00"
      },
      {
          id: 10,
          notification: {
            title: "New Message",
            body: "You received a new message from John Doe."
          },
          is_read: false,
          created_at: "2025-04-22T14:30:00"
        },
        
        {
          id: 11,
          notification: {
            title: "Payment Successful",
            body: "Your subscription payment for April has been processed."
          },
          is_read: true,
          created_at: "2025-04-21T09:15:00"
        },
        {
          id: 12,
          notification: {
            title: "New Comment",
            body: "Anna commented on your post: 'Great insights!'"
          },
          is_read: false,
          created_at: "2025-04-20T16:00:00"
        },
  ]

export function NotificationSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="m-0 p-1">
          <Bell />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>All the important notifications are here</SheetDescription>
        
        </SheetHeader>
        <ScrollArea className='h-screen w-full rounded-md pb-24'>
        <div className="grid gap-4 py-4 px-4">
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">No notifications yet</p>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`rounded-lg border p-4 shadow-sm transition-all ${
                  notif.is_read
                    ? "bg-white border-gray-200"
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                <h4 className="text-sm font-semibold text-gray-900">{notif.notification.title}</h4>
                <p className="text-sm text-gray-700 mt-1">{notif.notification.body}</p>
                <span className="block text-xs text-gray-400 mt-2">
                  {new Date(notif.created_at).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
