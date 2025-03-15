'use client';
import { DataTableColumnHeader } from "@/components/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner"; // ✅ Toast for notifications

export const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    enableSorting: true,
  },
  {
    accessorKey: "username",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Username" />,
    enableSorting: true,
  },
  {
    accessorKey: "role_display",
    header: "Role",
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "is_active",
    header: "Verified",
    cell: ({ row }) =>
      row.original.is_active ? (
        <Badge variant="secondary">Verified</Badge>
      ) : (
        <Badge variant="destructive">Unverified</Badge>
      ),
  },
  {
    accessorKey: "is_blocked",
    header: "Blocked Status",
    cell: ({ row }) =>
      row.original.is_blocked ? (
        <Badge variant="destructive">Blocked</Badge>
      ) : (
        <Badge variant="outline">Active</Badge>
      ),
  },
  {
    accessorKey: "date_joined",
    header: "Date Joined",
    cell: ({ row }) => new Date(row.original.date_joined).toLocaleDateString(),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      // ✅ Function to handle blocking/unblocking
      const handleBlockToggle = async () => {
        try {
          const endpoint = user.is_blocked ? "unblock" : "block"; // ✅ Dynamic route selection
          const response = await fetch(`/api/admin/users/${user.id}/${endpoint}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
          });

          const data = await response.json();
          if (!response.ok) throw new Error(data.error || "Action failed");

          toast.success(`✅ User ${user.is_blocked ? "unblocked" : "blocked"} successfully`);
          window.location.reload(); // ✅ Refresh the table after action
        } catch (error) {
          toast.error("🚨 Error: " + error.message);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.email)}>
              Copy email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleBlockToggle}>
              {user.is_blocked ? (
                <Badge variant="secondary">Unblock Student</Badge>
              ) : (
                <Badge variant="destructive">Block Student</Badge>
              )}
            </DropdownMenuItem>
            {!user.is_active && <DropdownMenuItem>Verify User</DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
