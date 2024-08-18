import Image from "next/image";
import React from "react";
import heroImage from "@/assets/img/hero-image.png";
import { Button } from "../ui/button";
import { createAuthURL } from "@/utils/authURLHelper";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="bg-secondary-color max-w-5xl">
      <div className="flex flex-col items-center gap-6 py-8">
        <h1 className="text-6xl font-extrabold text-white text-center">
          Split your Playlist by Genre
        </h1>
        <p className="text-lg  text-slate-400 text-center tracking-tight max-w-2xl">
          {
            "Sort your messy playlists into Genre-Specific Collections. Just pick your existing playlists and the genres you want, and we'll do the rest."
          }
        </p>
        <Button
          className="bg-gradient-to-r from-emerald-400 to-emerald-500 font-bold text-white"
          asChild
        >
          <Link href={createAuthURL()}>Get Started</Link>
        </Button>
        <div className="flex-col rounded-xl overflow-hidden shadow-2xl hidden md:block w-4/5">
          <div className="bg-gray-300 dark:bg-[#1E1E1E] p-2 w-full flex items-center gap-1.5">
            <div className="bg-[#FF5E57] h-3 w-3 rounded-full"></div>
            <div className="bg-[#FFBB2E] h-3 w-3 rounded-full"></div>
            <div className="bg-[#38C149] h-3 w-3 rounded-full"></div>
          </div>
          <div className="w-full h-[350px] flex items-center justify-center">
            <iframe
              src="https://player.vimeo.com/video/1000118571?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              className="w-full h-full"
              title="Genresplit Demo"
            ></iframe>
            <script src="https://player.vimeo.com/api/player.js"></script>
          </div>
        </div>
      </div>
      <div>
        <p>
          {
            "Made by Raphael Sanchez - GenreSplit is not related to Spotify AB or any of it’s partners in any way"
          }
        </p>
        <p>Privacy Policy</p>
      </div>
    </div>
  );
}
