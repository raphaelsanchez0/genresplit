import { exchangeCodeForToken } from "@/utils/authHelpers";
import { cookieNames } from "@/utils/constants";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const pathToRouteOnToSuccessfulAuth = "/search";

export async function GET(request: NextRequest) {
  //const url = new URL(request.url);
  const url = request.nextUrl.clone();
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  //const next = searchParams.get("next") ?? "/";

  if (code) {
    try {
      const tokenData = await exchangeCodeForToken(code);
      const cookieStore = cookies();

      cookieStore.set({
        name: cookieNames.SPOTIFY_TOKEN,
        value: tokenData.access_token,
        httpOnly: true,
        path: "/",
      });

      url.pathname = pathToRouteOnToSuccessfulAuth;

      return NextResponse.redirect(url);
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      url.pathname = "/auth/auth-code-error";
      return NextResponse.redirect(url);
    }
  }
  url.pathname = "/auth/auth-code-error";
  return NextResponse.redirect(url);
}
