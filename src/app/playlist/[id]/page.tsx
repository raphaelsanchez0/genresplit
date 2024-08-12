import React from "react";

interface PlaylistProps {
  params: {
    id: string;
  };
}

export default function Playlist({ params: { id } }: PlaylistProps) {
  console.log(id);
  return <div>{id}</div>;
}
