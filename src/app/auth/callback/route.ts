import { exchangeCodeForToken } from "@/utils/authHelpers";
import { cookieNames } from "@/utils/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const pathToRouteOnToSuccessfulAuth = "/search";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/";
  const origin = url.origin;

  if (code) {
    try {
      const tokenData = await exchangeCodeForToken(code);
      const cookieStore = cookies();
      const secondsInHour = 3600000;
      cookieStore.set({
        name: cookieNames.SPOTIFY_TOKEN,
        value: tokenData.access_token,
        httpOnly: false,
        path: "/",
        expires: Date.now() + secondsInHour,
        sameSite: "lax",
        secure: true,
      });

      const redirectUrl = new URL(next, origin);
      redirectUrl.pathname = pathToRouteOnToSuccessfulAuth;
      return NextResponse.redirect(redirectUrl.toString());
    } catch (error) {
      const err = error as Error;
      console.error("Error occurred while exchanging code for token:", {
        code,
        error: err.message,
        stack: err.stack,
      });
      const errorUrl = new URL("/auth/auth-code-error", origin);
      return NextResponse.redirect(errorUrl.toString());
    }
  }

  const errorUrl = new URL("/auth/auth-code-error/nocode", origin);
  return NextResponse.redirect(errorUrl.toString());
}
