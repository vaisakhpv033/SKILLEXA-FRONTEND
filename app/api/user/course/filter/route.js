import { NextResponse } from "next/server"; 
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const level = searchParams.get("level");
        const category = searchParams.get("category");
        const subcategory = searchParams.get("subcategory");

        // Construct query string
        const queryParams = new URLSearchParams();

        if (category) queryParams.append("category", category);
        if (level) queryParams.append("level", level);
        if (subcategory) queryParams.append("subcategory", subcategory);

        // Build URL
        const hasParams = [...queryParams.values()].length > 0;
        const apiUrl = hasParams
        ? `${API_BASE_URL}/course/courses/published/?${queryParams.toString()}`
        : `${API_BASE_URL}/course/courses/`;

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
