import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import cloudinary from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";



export async function GET(req){
    try{
        const session = await getServerSession(authOptions);
        if (!session || session?.user?.user?.role !== 2){
            return NextResponse.json({error:"unauthorized"}, {status:401})
        }

        const {searchParams} = new URL(req.url);
        const courseId = searchParams.get("course");
        const sectionId = searchParams.get("section");
        const lessonId = searchParams.get("lesson");

        const userId = session.user.user.id;
        const timestamp = Math.round(new Date().getTime() /1000);

        const folderpath = `skillexa/course/${userId}/${courseId}/${sectionId}/${lessonId}/`;

        const signature = cloudinary.utils.api_sign_request(
            {timestamp, folder:folderpath},
            process.env.CLOUDINARY_API_SECRET
        );

        return NextResponse.json({
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            folder: folderpath,
            timestamp,
            signature,
        });
    }catch (error) {
        console.error("Cloudinary signed URL error:", error)
        return NextResponse.json({error:"Failed to generate signed URL"}, {status:500})
    }
}