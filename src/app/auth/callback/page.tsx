import AuthCallback from "@/components/auth-callback/AuthCallback";

import React, { Suspense } from "react";

export default function Callback() {
  return (
    <Suspense>
      <Suspense />
      <AuthCallback />
    </Suspense>
  );
}
