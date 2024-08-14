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

      cookieStore.set({
        name: cookieNames.SPOTIFY_TOKEN,
        value: tokenData.access_token,
        httpOnly: true,
        path: "/",
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
