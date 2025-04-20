import { NextResponse } from "next/server"; 
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export async function GET(req) {
    try {
        // Step 1: Extract course ID from request url params (if present)
        const {searchParams} = new URL(req.url);
        const courseId = searchParams.get("id");

        if (!courseId){
            return NextResponse.json({error:"Course id is required"}, {status: 400})
        }

        // step 2: construct URL
        const apiUrl = `${API_BASE_URL}/curriculum/sections/student/${courseId}/`;

        // Step 3: Fetch courses from Django API
        const response = await axios.get(apiUrl);

        // Step 4: Return Django API response
        return NextResponse.json(response.data, { status: response.status });

    } catch (error) {
        console.error("Curriculum fetching error:", error?.response?.data || error.message);

        const errorMessage = error?.response?.data?.error || "Curriculum fetching failed. Please try again later.";

        return NextResponse.json({ error: errorMessage }, { status: error?.response?.status || 500 });
    }
}
