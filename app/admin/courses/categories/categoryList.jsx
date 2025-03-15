"use client";

import { useState } from "react";
import useSWR from "swr";
import { Plus, ChevronDown, ChevronRight } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    // Try to extract error message from the response
    let errorMessage = `HTTP error! Status: ${res.status}`;
    try {
      const errorData = await res.json();
      if (errorData?.error) {
        errorMessage = errorData.error;
      }
    } catch (err) {
      console.error("Error parsing response JSON:", err);
    }

    throw new Error(errorMessage);
  }

  return res.json();
};

// Form schema for category creation
const categorySchema = z.object({
  name: z.string().min(2).max(50).regex(/^[a-zA-Z\s]+$/, {
    message: "Category name must contain only letters and spaces",
  }),
});


export default function CategoryList() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/admin/categories",
    fetcher
  );
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to create category");

      // Refresh the categories list
      await mutate();
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-pulse text-muted-foreground">
          Loading categories...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter category name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Create Category
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {data?.results?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-40">
            <p className="text-muted-foreground">No categories available.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setOpen(true)}
            >
              Create your first category
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {data?.results.map((category) => (
            category ? (
            <CategoryItem key={category?.id} category={category} />
            ):(
              <span className="text-red-700">Something Went Wrong.Error Fetching Categories</span>
            )
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryItem({ category }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubcategories = category.subcategories.length > 0;

  return (
    <Card className="overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-md font-semibold">
              {category?.name}
            </CardTitle>
            {hasSubcategories && (
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            )}
          </div>
        </CardHeader>
        {hasSubcategories && (
          <CollapsibleContent>
            <CardContent className="pt-0 pb-4">
              <div className="pl-6 border-l-2 border-muted ml-4 space-y-2">
                {category.subcategories.map((sub) => (
                  <CategoryItem key={sub?.id} category={sub} />
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        )}
      </Collapsible>
    </Card>
  );
}








// "use client";
// import useSWR from "swr";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const fetcher = (url) => fetch(url).then((res) => res.json());

// export default function CategoryList() {
//     const { data, error, isLoading } = useSWR("/api/admin/categories", fetcher);

//     if (isLoading) return <p>Loading categories...</p>;
//     if (error) return <p className="text-red-500">Error: {error.message}</p>;

//     return (
//         <div className="p-6 rounded">
//             <h2>All Categories</h2>
//             {data?.results?.length === 0 ? (
//                 <p>No categories available.</p>
//             ) : (
//                 <ul>
//                     {data.results.map((category) => (
//                         <CategoryItem key={category.id} category={category} />
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// }


// export function CategoryItem({ category }) {
//     return (
//         <Card className="my-2">
//             <CardHeader>
//                 <CardTitle>{category.name}</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 {category.subcategories.length > 0 && (
//                     <ul className="pl-4 border-l">
//                         {category.subcategories.map((sub) => (
//                             <CategoryItem key={sub.id} category={sub} />
//                         ))}
//                     </ul>
//                 )}
//             </CardContent>
//         </Card>
//     );
// }