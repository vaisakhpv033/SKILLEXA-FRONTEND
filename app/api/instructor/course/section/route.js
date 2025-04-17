import { NextResponse } from "next/server"; 
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export async function GET(req) {
    try {
        // Step 1: Retrieve session from NextAuth
        const session = await getServerSession(authOptions);
        if (!session || !session.accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Step 2: Extract course ID from request url params (if present)
        const {searchParams} = new URL(req.url);
        const courseId = searchParams.get("id");

        // step 3: construct URL based on the presence of course ID
        const apiUrl = `${API_BASE_URL}/curriculum/sections/by-course/${courseId}/`

        // Step 4: Fetch courses from Django API
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });

        // Step 3: Return Django API response
        return NextResponse.json(response.data, { status: response.status });

    } catch (error) {
        console.error("Course fetching error:", error?.response?.data || error.message);

        const errorMessage = error?.response?.data?.error || "Course fetching failed. Please try again later.";

        return NextResponse.json({ error: errorMessage }, { status: error?.response?.status || 500 });
    }
}
