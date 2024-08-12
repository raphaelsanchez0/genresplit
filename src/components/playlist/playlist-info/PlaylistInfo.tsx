import { Card } from "@/components/ui/card";
import React from "react";

interface PlaylistInfoProps {
  id: string;
  token: string;
}

export default async function PlaylistInfo({ id, token }: PlaylistInfoProps) {
  return (
    <Card className="full-page-card">
      <div className="flex-1 flex flex-row p-4">
        <Card className="basis-1/3"></Card>
        <div className="basis-2/3"></div>
      </div>
    </Card>
  );
}
