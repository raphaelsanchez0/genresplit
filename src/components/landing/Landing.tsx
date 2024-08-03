import Image from "next/image";
import React from "react";
import heroImage from "@/assets/img/hero-image.png";

export default function Landing() {
  return (
    <div>
      <div className="flex flex-col flex-1">
        <h1 className="text-xl font-bold">Organize your Playlists</h1>
        <p>Sort your liked songs (and more) into Genre-Specific Collections</p>
      </div>
      <Image src={heroImage} alt="Hero Image" />
    </div>
  );
}
