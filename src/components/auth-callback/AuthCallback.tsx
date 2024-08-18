"use client";

import { exchangeCodeForToken } from "@/utils/authHelpers";
import { localStorageKeys } from "@/utils/constants";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import LoadingCard from "../loading-card/LoadingCard";
import { Card } from "../ui/card";

export default function Callback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");

  useEffect(() => {
    const getAndSetToken = async () => {
      if (code) {
        try {
          const tokenData = await exchangeCodeForToken(code);
          const token: string = tokenData.access_token;
          localStorage.setItem(localStorageKeys.SPOTIFY_TOKEN, token);
          router.push("/search");
        } catch (error) {
          const err = error as Error;
          console.error("Error occurred while exchanging code for token:", {
            code,
            error: err.message,
            stack: err.stack,
          });
        }
      }
    };

    getAndSetToken();
  }, [code]);
  return (
    <div className="page">
      <Card className="full-page-card">
        <LoadingCard />
      </Card>
    </div>
  );
}
