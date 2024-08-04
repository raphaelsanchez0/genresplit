import NavbarUI from "@/components/navbar/NavbarUI";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarUI />
      {children}
    </>
  );
}
