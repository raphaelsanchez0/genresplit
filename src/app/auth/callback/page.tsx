import AuthCallback from "@/components/auth-callback/AuthCallback";
import { exchangeCodeForToken } from "@/utils/authHelpers";
import { localStorageKeys } from "@/utils/constants";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, use, useEffect } from "react";

export default function Callback() {
  return (
    <Suspense>
      <AuthCallback />
    </Suspense>
  );
}
