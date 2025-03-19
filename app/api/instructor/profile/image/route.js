// import { NextResponse } from "next/server";
// import cloudinary from "@/lib/cloudinary";
// import axios from "axios";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { Readable } from "stream";

// // Disable Next.js default body parsing
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// async function toNodeReadableStream(request) {
//     const reader = request.body.getReader();
//     const stream = new Readable({
//       async read() {
//         const { done, value } = await reader.read();
//         if (done) this.push(null);
//         else this.push(value);
//       },
//     });
  
//     // Fix: Ensure `content-length` is not undefined
//     stream.headers = {
//       ...request.headers,
//       "content-type": request.headers.get("content-type") || "multipart/form-data",
//       "content-length": request.headers.get("content-length") || "0",
//     };
  
//     return stream;
//   }

// export async function POST(req) {
//   try {
//     // Import `formidable` dynamically (Fixes Next.js 15 / Turbopack issues)
//     const formidable = (await import("formidable")).default;

//     // Authenticate user session
//     const session = await getServerSession(authOptions);
//     if (!session || !session.accessToken) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const userId = session.user.user.id;
//     console.log("Uploading for user:", userId);

//     // Correct `formidable` initialization
//     const form = formidable({
//       uploadDir: "/tmp",
//       keepExtensions: true,
//       allowEmptyFiles: false,
//       minFileSize: 1024, // 1KB
//       maxFileSize: 5 * 1024 * 1024, // 5MB limit
//       filter: ({ mimetype }) => mimetype && mimetype.startsWith("image/"), // Only allow images
//     });

//     console.log("hello")
//     const nodeReq = await toNodeReadableStream(req);
//     // Parse form-data
//     const [fields, files] = await form.parse(nodeReq);
//     if (!files.file) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     const file = files.file[0]; //  Get uploaded file
//     console.log("before uploading")
//     // Upload file to Cloudinary
//     const uploadResponse = await cloudinary.uploader.upload(file.filepath, {
//       folder: `skillexa/${userId}`,
//       resource_type: "image",
//     });

//     console.log("uploaded successfull")
//     const imageUrl = uploadResponse.secure_url;

//     // Send PATCH request to Django API
//     const body = { profile_image: imageUrl };
//     const response = await axios.patch(`${API_BASE_URL}/accounts/profile/`, body, {
//       headers: {
//         Authorization: `Bearer ${session.accessToken}`,
//         "Content-Type": "application/json",
//       },
//     });

//     return NextResponse.json(response.data, { status: response.status });
//   } catch (error) {
//     console.error("Profile update error:", error?.response?.data || error.message);
//     return NextResponse.json(
//       { error: error?.response?.data?.error || "Something went wrong" },
//       { status: error?.response?.status || 500 }
//     );
//   }
// }
