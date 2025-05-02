'use client';
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PencilIcon, Save, User2 } from "lucide-react";
import { Button } from "../ui/button";
import ShinyText from "../react-bits/shinyTest";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const usernameRegex = /^[a-zA-Z0-9]+$/;

const profileSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(1, "Last name must be at least 1 characters"),
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .regex(usernameRegex, "Username can only contain letters and numbers"),
  designation: z.string().optional(),
  bio: z.string().max(1000, "Bio must not exceed 1000 characters").optional(),
});

export default function ProfileTab({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: user,
  });

  console.log(user);

  const onSubmit = async (formData) => {
    try {
      const response = await fetch("/api/instructor/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("error", data.error);
      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      const updatedUser = data;
      toast.success("Profile Updated Successfully")
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message);
    }
  };


  
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Allowed file formats
    const allowedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    // Check file type
    if (!allowedFormats.includes(file.type)) {
      toast.error("Invalid file format. Please upload a JPEG, PNG, GIF, or WEBP image.");
      return;
    }

    // check file size
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      return;
    }

    const localImageUrl = URL.createObjectURL(file);
    setUser((prevUser) => ({ ...prevUser, profile_picture: localImageUrl }));

    setUploading(true);
    try {

      // step 1 get a signed url with user id
      const signedUrlRes = await fetch("/api/instructor/profile/image/upload-url");
      const signedUrlData = await signedUrlRes.json();

      if (!signedUrlRes.ok) throw new Error(signedUrlData.error || "Failed to get signed URL");

      // step 2 upload image to cloudinary 
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signedUrlData.apiKey);
      formData.append("timestamp", signedUrlData.timestamp);
      formData.append("signature", signedUrlData.signature);
      formData.append("folder", signedUrlData.folder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${signedUrlData.cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error?.message || "upload failed")

      const imageUrl = uploadData.secure_url;


      // step 3 update profile picture url in the database
      const response = await fetch("/api/instructor/profile", {
        method: "PATCH",
        body: JSON.stringify({profile_picture: imageUrl}),
      })

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      

      toast.success("Profile picture updated successfully!");
    } catch (err) {
      toast.error(err.message || "Image upload failed")
    }finally {
      setUploading(false);
    }

    return true
  }

  return (
    <Card className="w-full max-w-7xl mx-auto shadow-md border dark:border-border bg-background transition-all">
    <CardHeader className="flex flex-col sm:flex-row justify-between items-start gap-4">
      <div className="relative group">
        <Avatar className="h-24 w-24 ring-2 ring-primary/20">
          <AvatarImage src={user.profile_picture} alt={user.first_name} />
          <AvatarFallback>
            <User2 className="h-10 w-10" />
          </AvatarFallback>
        </Avatar>
        <button
          type="button"
          className="absolute bottom-0 right-0 bg-muted text-foreground p-1 rounded-full shadow-sm hover:bg-muted/80 transition"
          onClick={() => fileInputRef.current.click()}
          disabled={uploading}
        >
          <PencilIcon className="h-4 w-4" />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      <Button
        variant={isEditing ? "secondary" : "outline"}
        onClick={() => setIsEditing(!isEditing)}
        className="h-10"
      >
        <PencilIcon className="h-4 w-4 mr-2" />
        {isEditing ? 'Cancel' : 'Edit'}
      </Button>
    </CardHeader>

    <Separator />

    <CardContent className="pt-6 space-y-6">
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first_name">First Name</Label>
              <Input id="first_name" {...register("first_name")} />
              {errors.first_name && (
                <p className="text-red-500 text-sm">{errors.first_name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="last_name">Last Name</Label>
              <Input id="last_name" {...register("last_name")} />
              {errors.last_name && (
                <p className="text-red-500 text-sm">{errors.last_name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" {...register("username")} />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="designation">Designation</Label>
              <Input id="designation" {...register("designation")} />
            </div>
          </div>
          <div>
            <Label htmlFor="bio">About</Label>
            <Textarea rows={5} id="bio" {...register("bio")} />
            {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
          </div>
          <div className="pt-2">
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <ShinyText
              text={`${user.first_name} ${user.last_name}`}
              className="text-2xl font-bold"
              disabled={false}
              speed={2}
            />
            <p className="text-muted-foreground font-medium">{user.designation}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Username: {user.username}</p>
            <p className="text-muted-foreground text-sm">Email: {user.email}</p>
          </div>
          <div>
            <h5 className="text-muted-foreground font-semibold">About</h5>
            <p className="text-sm text-foreground whitespace-pre-line">{user.bio}</p>
          </div>
        </div>
      )}
    </CardContent>
  </Card>
  );
}
