import React, { forwardRef } from "react";
import { ConnectionQuality } from "@heygen/streaming-avatar";

import { useStreamingAvatarSession } from "./logic";
import { StreamingAvatarSessionState } from "./logic";
import { Button } from "./ui/button";
import { Cross } from "lucide-react";
import { useConnectionQuality } from "./logic";

export const AvatarVideo = forwardRef<HTMLVideoElement>(({}, ref) => {
  const { sessionState, stopAvatar } = useStreamingAvatarSession();
  const { connectionQuality } = useConnectionQuality();

  const isLoaded = sessionState === StreamingAvatarSessionState.CONNECTED;

  return (
    <>
      {connectionQuality !== ConnectionQuality.UNKNOWN && (
        <div className="absolute top-3 left-3 rounded-lg bg-black px-3 py-2 text-white">
          Connection Quality: {connectionQuality}
        </div>
      )}
      {isLoaded && (
        <Button onClick={stopAvatar}>
          <Cross />
        </Button>
      )}
      <video
        ref={ref}
        autoPlay
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      >
        <track kind="captions" />
      </video>
      {!isLoaded && (
        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
          Loading...
        </div>
      )}
    </>
  );
});
AvatarVideo.displayName = "AvatarVideo";
