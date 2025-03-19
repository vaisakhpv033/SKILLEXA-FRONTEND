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
