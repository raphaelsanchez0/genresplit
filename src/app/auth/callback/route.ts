import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
  console.log("test");

  if (code) {
    const cookieStore = cookies();

    // Store the authorization code in a cookie
    cookieStore.set({
      name: "spotify_auth_code",
      value: code,
      httpOnly: true,
      path: "/",
    });

    // Redirect to the next page (dashboard or specified next page)
    return NextResponse.redirect(`${origin}${next}/dashboard`);
  }

  // Redirect to an error page if the code is not present
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
