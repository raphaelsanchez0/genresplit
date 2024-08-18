import Image from "next/image";
import React from "react";
import heroImage from "@/assets/img/hero-image.png";

export default function Landing() {
  return (
    <div className="bg-secondary-color max-w-5xl">
      <div className="flex flex-col flex-1">
        <div className="flex ">
          <h1 className="text-xl font-bold text-accent-color">
            Organize your Playlists
          </h1>
          <p>
            Sort your liked songs (and more) into Genre-Specific Collections
          </p>
          <Image src={heroImage} alt="Hero Image" />
        </div>
      </div>
    </div>
  );
}
