'use client'
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
      
      // update user profile
      setUser((prevUser) => ({...prevUser, profile_picture: data.url}));

      toast.success("Profile picture updated successfully!");
    } catch (err) {
      toast.error(err.message || "Image upload failed")
    }finally {
      setUploading(false);
    }

    return true
  }

  return (
    <div className="border p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="relative group">
          <Avatar className="h-20 w-20 ring-2 ring-primary/10">
            <AvatarImage src={user.profile_picture} alt={user.first_name} />
            <AvatarFallback>
              <User2 className="h-10 w-10" />
            </AvatarFallback>
          </Avatar>

          {/* Edit Icon Overlay */}
          <button
            className="absolute bottom-0 right-0 bg-gray-800 dark:bg-gray-200 dark:text-black text-white p-1 rounded-full opacity-80 hover:opacity-100 transition group-hover:opacity-100"
            onClick={() => fileInputRef.current.click()}
            disabled={uploading}
          >
            <PencilIcon className="h-4 w-4" />
          </button>

          {/* Hidden File Input */}
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
          size="icon"
          onClick={() => setIsEditing(!isEditing)}
          className="h-8 w-8"
        >
          <PencilIcon className="h-4 w-4" />
        </Button>
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" type="text" {...register("first_name")} />
            {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" type="text" {...register("last_name")} />
            {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" {...register("username")} />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>
          <div>
            <Label htmlFor="designation">Designation</Label>
            <Input id="designation" type="text" {...register("designation")} />
          </div>
          <div>
            <Label htmlFor="description">About</Label>
            <Textarea id="description" {...register("bio")} />
            {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
          </div>
          <div className="my-4">
            <Button type="submit">
              <Save className="h-4 w-4" /> Save
            </Button>
          </div>
        </form>
      ) : (
        <div>
          <div>
            <ShinyText
              text={`${user.first_name.toUpperCase()} ${user.last_name.toUpperCase()}`}
              disabled={false}
              speed={3}
              className="font-extrabold text-lg"
            />
          </div>
          <div>
            <ShinyText
              text={user.designation}
              className="text-md font-semibold text-gray-700"
              disabled={false}
              speed={3}
            />
          </div>
          <p className="text-gray-500 font-mono mt-2">Username: {user.username}</p>
          <p className="text-gray-500 font-mono ">Email: {user.email}</p>
          <div>
            <h5 className="text-gray-400 mt-2">About</h5>
            <p className="text-sm text-gray-600">{user.bio}</p>
          </div>
        </div>
      )}
    </div>
  );
}
