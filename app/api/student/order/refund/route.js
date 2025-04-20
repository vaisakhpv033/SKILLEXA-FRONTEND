import { NextResponse } from "next/server"; 
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export async function POST(req) {
    try {
        //  Get session from NextAuth
        const session = await getServerSession(authOptions);
        if (!session || !session.accessToken || session?.user?.user?.role !== 1) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        //  Extract body from request
        const body = await req.json();

        //  Send request to Django backend
        const response = await axios.post(`${API_BASE_URL}/order/refund-course/`, body, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
            },
        });

        console.log("Refund Successfull:", response.data);
        return NextResponse.json(response.data, { status: response.status });

    } catch (error) {
        console.error("Refund Request Error:", error?.response?.data || error.message);

        let errorMessage = "Something went wrong. Please try again.";
        if (error?.response?.data && typeof error.response.data === "object") {
            const firstKey = Object.keys(error.response.data)[0];
            errorMessage = error.response.data[firstKey][0] || errorMessage;
        }

        return NextResponse.json({ error: errorMessage }, { status: error?.response?.status || 500 });
    }
}
