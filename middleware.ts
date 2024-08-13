import { createAuthURL } from "@/utils/authHelpers";
import { cookieNames } from "@/utils/constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get(cookieNames.SPOTIFY_TOKEN)?.value;

  if (!currentUser) {
    const authURL = new URL(createAuthURL(), request.url);
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: ["/search"],
};
