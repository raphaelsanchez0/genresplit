import { cookieNames } from "@/utils/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const pathToRouteOnToSuccessfulAuth = "/home";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
  console.log("test");

  if (code) {
    const cookieStore = cookies();

    cookieStore.set({
      name: cookieNames.SPOTIFY_AUTH_CODE,
      value: code,
      httpOnly: true,
      path: "/",
    });

    return NextResponse.redirect(
      `${origin}${next}${pathToRouteOnToSuccessfulAuth}`
    );
  }

  // Redirect to an error page if the code is not present
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
