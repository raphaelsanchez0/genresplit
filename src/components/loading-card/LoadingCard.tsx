import React from "react";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface LoadingCardProps {
  hasHeaderSkeleton?: boolean;
}

export default function LoadingCard({
  hasHeaderSkeleton = false,
}: LoadingCardProps) {
  if (hasHeaderSkeleton)
    return (
      <Card className="full-page-card ">
        <div className="grid grid-cols-3">
          <div className="flex flex-col items-center justify-center p-6 gap-4 col-start-2 col-end-3">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        </div>

        <div className="p-6 grid grid-cols-3 gap-3">
          {Array.from({ length: 36 }).map((_, index) => (
            <Skeleton key={index} className="h-16" />
          ))}
        </div>
      </Card>
    );
  return (
    <div className="p-6 grid grid-cols-3 gap-3">
      {Array.from({ length: 36 }).map((_, index) => (
        <Skeleton key={index} className="h-16" />
      ))}
    </div>
  );
}
