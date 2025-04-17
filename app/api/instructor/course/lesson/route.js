import { NextResponse } from "next/server"; 
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";


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
        const response = await axios.post(`${API_BASE_URL}/curriculum/lessons/`, body, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
            },
        });

        console.log("Lesson Created:", response.data);
        return NextResponse.json(response.data, { status: response.status });

    } catch (error) {
        console.error("Lesson Creation Error:", error?.response?.data || error.message);

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

        // Step 2: Extract Lesson ID from request URL
        const { searchParams } = new URL(req.url);
        const LessonId = searchParams.get("id");

        if (!LessonId) {
            return NextResponse.json({error: "Lesson id is required"}, {status: 400})
        }

        //  Extract body from request
        const body = await req.json();


        //  Send request to Django backend
        const response = await axios.patch(`${API_BASE_URL}/curriculum/lessons/${LessonId}/`, body, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
            },
        });

        console.log("Lesson Updated:", response.data);
        return NextResponse.json(response.data, { status: response.status });

    } catch (error) {
        console.error("Lesson Updation Error:", error?.response?.data || error.message);

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

        // Step 2: Extract Lesson ID from request URL
        const { searchParams } = new URL(req.url);
        const LessonId = searchParams.get("id");

        // Step 3: Validate Lesson ID
        if (!LessonId) {
            return NextResponse.json({ error: "Lesson ID is required for deletion." }, { status: 400 });
        }

        // Step 4: Send DELETE request to Django API
        const response = await axios.delete(`${API_BASE_URL}/curriculum/lessons/${LessonId}/`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });

        if (response.status === 204) {
            return NextResponse.json({ message: "Lesson removed from course." }, { status: 200 });
        }

        // Handle standard JSON responses
        return NextResponse.json(response.data || { message: "Lesson removed from course." }, { status: response.status });

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
