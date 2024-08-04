import NavbarUI from "@/components/navbar/NavbarUI";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col">
      <NavbarUI />
      {children}
    </div>
  );
}
