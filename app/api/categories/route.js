import { NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export async function GET(req) {
    try {
        // Send authenticated request to Django backend
        const response = await axios.get(`${API_BASE_URL}/course/topics/`, {
        });
        console.log("response", response.data);
        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error("topics fetch error:", error?.response?.data);
        let errorMessage = "Something went wrong";
        if (error?.response?.data && typeof error.response.data === "object") {
            const firstKey = Object.keys(error.response.data)[0];
            errorMessage = error.response.data[firstKey][0];
        }
        return NextResponse.json({ error: errorMessage }, { status: error?.response?.status || 500 });
    }
}

