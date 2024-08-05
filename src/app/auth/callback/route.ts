import { exchangeCodeForToken } from "@/utils/authHelpers";
import { cookieNames } from "@/utils/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const pathToRouteOnToSuccessfulAuth = "/search";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { searchParams, origin } = new URL(request.url);
  console.log(url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

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

      return NextResponse.redirect(
        `${origin}${next}${pathToRouteOnToSuccessfulAuth}`
      );
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      return NextResponse.redirect("/auth/auth-code-error");
    }
  }

  // Redirect to an error page if the code is not present
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
