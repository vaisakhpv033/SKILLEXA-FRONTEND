import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ role: undefined }), { status: 200 });
  }
  return new Response(JSON.stringify({ role: session.user.user.role }), { status: 200 });
}
