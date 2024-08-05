import { createAuthURL } from "@/utils/authHelpers";
import { cookieNames } from "@/utils/constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get(cookieNames.SPOTIFY_TOKEN)?.value;

  if (!currentUser) {
    return Response.redirect(new URL(createAuthURL()));
  }
}

export const config = {
  matcher: ["/search"],
};
