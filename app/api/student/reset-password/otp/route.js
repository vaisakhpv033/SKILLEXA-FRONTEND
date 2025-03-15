import { NextResponse } from "next/server"; 
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export async function POST(req){
    try {
        // Retrieve session from NextAuth
        const session = await getServerSession(authOptions);
        if (!session || !session.accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        // forward request to django api 
        const response = await axios.post(`${API_BASE_URL}/student/reset-password/otp/`, {}, {
            headers:{
                Authorization: `Bearer ${session.accessToken}`,
            }
        });

        return NextResponse.json(response.data, { status: response.status});
    } catch(error){

        console.error("Registration error", error?.response?.data)
        let errorMessage = "Otp resending failed please try again later"
        if (error?.response?.data && typeof error.response.data == "object"){
            const firstKey = Object.keys(error.response.data)[0];
            errorMessage = error.response.data[firstKey][0];
        }
        return NextResponse.json({error: errorMessage}, {status: error?.response?.status || 500});
    }
}