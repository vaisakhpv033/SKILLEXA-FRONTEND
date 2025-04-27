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



export async function POST(req) {
    try {
        //  Get session from NextAuth
        const session = await getServerSession(authOptions);
        if (!session || !session.accessToken || session?.user?.user?.role !== 2) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        //  Extract body from request
        const body = await req.json();

        //  Send request to Django backend
        const response = await axios.post(`${API_BASE_URL}/curriculum/sections/`, body, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
            },
        });

        console.log("Section Created:", response.data);
        return NextResponse.json(response.data, { status: response.status });

    } catch (error) {
        console.error("Section Creation Error:", error?.response?.data || error.message);

        let errorMessage = "Something went wrong. Please try again.";
        if (error?.response?.data && typeof error.response.data === "object") {
            const firstKey = Object.keys(error.response.data)[0];
            errorMessage = error.response.data[firstKey][0] || errorMessage;
        }

        return NextResponse.json({ error: errorMessage }, { status: error?.response?.status || 500 });
    }
}



export async function PATCH(req) {
    try {
        // Get session from NextAuth
        const session = await getServerSession(authOptions);
        if (!session || !session.accessToken || session?.user?.user?.role !== 2) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Step 2: Extract section ID from request URL
        const { searchParams } = new URL(req.url);
        const sectionId = searchParams.get("id");

        if (!sectionId) {
            return NextResponse.json({error: "Section id is required"}, {status: 400})
        }

        //  Extract body from request
        const body = await req.json();


        //  Send request to Django backend
        const response = await axios.patch(`${API_BASE_URL}/curriculum/sections/${sectionId}/`, body, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
            },
        });

        console.log("Section Updated:", response.data);
        return NextResponse.json(response.data, { status: response.status });

    } catch (error) {
        console.error("Section Updation Error:", error?.response?.data || error.message);

        let errorMessage = "Something went wrong. Please try again.";
        if (error?.response?.data && typeof error.response.data === "object") {
            const firstKey = Object.keys(error.response.data)[0];
            errorMessage = error.response.data[firstKey][0] || errorMessage;
        }

        return NextResponse.json({ error: errorMessage }, { status: error?.response?.status || 500 });
    }
}



export async function DELETE(req) {
    try {
        // Step 1: Retrieve session from NextAuth
        const session = await getServerSession(authOptions);
        if (!session || !session.accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Step 2: Extract section ID from request URL
        const { searchParams } = new URL(req.url);
        const sectionId = searchParams.get("id");

        // Step 3: Validate section ID
        if (!sectionId) {
            return NextResponse.json({ error: "Section ID is required for deletion." }, { status: 400 });
        }

        // Step 4: Send DELETE request to Django API
        const response = await axios.delete(`${API_BASE_URL}/curriculum/sections/${sectionId}/`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });

        if (response.status === 204) {
            return NextResponse.json({ message: "Section removed from course." }, { status: 200 });
        }

        // Handle standard JSON responses
        return NextResponse.json(response.data || { message: "Section removed from course." }, { status: response.status });

    } catch (error) {
        console.error("Something went wrong", error?.response?.data || error.message);

        // Extract detailed error message
        const errorMessage =
            error?.response?.data && typeof error.response.data === "object"
                ? Object.values(error.response.data)?.[0]?.[0] || "Something went wrong"
                : error?.response?.data || "Something went wrong";

        return NextResponse.json({ error: errorMessage }, { status: error?.response?.status || 500 });
    }
}
