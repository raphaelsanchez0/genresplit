import { createAuthURL } from "@/utils/authHelpers";
import { cookieNames } from "@/utils/constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get(cookieNames.SPOTIFY_TOKEN)?.value;

  if (!currentUser) {
    const authURL = new URL(createAuthURL(), request.url);
    console.log(authURL);
    return NextResponse.redirect(authURL);
  }
}

export const config = {
  matcher: ["/search"],
};
