import { cookieNames } from "@/utils/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = cookies();
  cookieStore.set(cookieNames.SPOTIFY_TOKEN, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  const { origin } = new URL(request.url);
  return NextResponse.redirect(`${origin}/`);
}
