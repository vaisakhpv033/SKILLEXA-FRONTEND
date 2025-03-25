import { NextResponse } from "next/server"; 
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export async function GET(req) {
    try {
        // Step 1: Extract course ID from request url params (if present)
        const {searchParams} = new URL(req.url);
        const courseId = searchParams.get("id");

        // step 2: construct URL based on the presence of course ID
        const apiUrl = courseId ? `${API_BASE_URL}/course/courses/${courseId}/` : `${API_BASE_URL}/course/courses/`;

        // Step 4: Fetch courses from Django API
        const response = await axios.get(apiUrl);

        // Step 3: Return Django API response
        return NextResponse.json(response.data, { status: response.status });

    } catch (error) {
        console.error("Course fetching error:", error?.response?.data || error.message);

        const errorMessage = error?.response?.data?.error || "Course fetching failed. Please try again later.";

        return NextResponse.json({ error: errorMessage }, { status: error?.response?.status || 500 });
    }
}
