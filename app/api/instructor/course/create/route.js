import { NextResponse } from "next/server"; 
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export async function POST(req) {
    try {
        // Retrieve session from NextAuth
        const session = await getServerSession(authOptions);
        if (!session || !session.accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Parse request body
        const body = await req.json();

        // Forward request to Django API
        const response = await axios.post(`${API_BASE_URL}/course/courses/`, body, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
            },
        });

        // Return Django API response
        return NextResponse.json(response.data, { status: response.status });

    } catch (error) {
        console.error("Course creation error:", error?.response?.data || error.message);

        // Default error message
        let errorMessage = "Course creation failed. Please try again later.";

        // Extract detailed error message if available
        if (error?.response?.data) {
            console.log(error?.response?.data);
            if (typeof error.response.data === "object") {
                const firstKey = Object.keys(error.response.data)[0];
                console.log("firstkey", firstKey);
                if (Array.isArray(error.response.data[firstKey])) {
                    errorMessage = error.response.data[firstKey][0];
                    console.log("1", errorMessage);
                } else {
                    errorMessage = error.response.data[firstKey];
                    console.log("2", errorMessage)
                }
            } else if (typeof error.response.data === "string") {
                errorMessage = error.response.data;
                console.log("3", errorMessage)
            }
        }

        return NextResponse.json({ error: errorMessage }, { status: error?.response?.status || 500 });
    }
}


/**
 * GET: Fetch All Courses (Protected API)
 */
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
        const apiUrl = courseId ? `${API_BASE_URL}/course/courses/${courseId}/` : `${API_BASE_URL}/course/courses/`;

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




export async function PATCH(req) {
    try {
        // Step 1: Retrieve session from NextAuth
        const session = await getServerSession(authOptions);
        if (!session || !session.accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Step 2: Extract course ID from request URL
        const { searchParams } = new URL(req.url);
        const courseId = searchParams.get("courseId");

        // Step 3: Validate course ID
        if (!courseId) {
            return NextResponse.json({ error: "Course ID is required for update." }, { status: 400 });
        }

        // Step 4: Parse request body
        const body = await req.json();

        // Step 5: Send PATCH request to Django API
        const response = await axios.patch(`${API_BASE_URL}/course/courses/${courseId}/`, body, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
            },
        });

        // Step 6: Return Django API response
        return NextResponse.json(response.data, { status: response.status });

    } catch (error) {
        console.error("Course update error:", error?.response?.data || error.message);

        // Extract detailed error message
        const errorMessage =
            error?.response?.data && typeof error.response.data === "object"
                ? Object.values(error.response.data)?.[0]?.[0] || "Course update failed."
                : error?.response?.data || "Course update failed.";

        return NextResponse.json({ error: errorMessage }, { status: error?.response?.status || 500 });
    }
}