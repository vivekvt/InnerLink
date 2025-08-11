/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  Phone,
  Clock,
  Link,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMemoizedFn, useUnmount } from "ahooks";
import {
  StreamingAvatarSessionState,
  useStreamingAvatarSession,
  useVoiceChat,
} from "./logic";
import {
  AvatarQuality,
  ElevenLabsModel,
  StartAvatarRequest,
  StreamingEvents,
  STTProvider,
  VoiceChatTransport,
  VoiceEmotion,
} from "@heygen/streaming-avatar";
import LoadingSkeleton from "./loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { IAvatar } from "./logic/avatars";
import { appConfig } from "@/lib/appConfig";

async function fetchAccessToken() {
  try {
    const response = await fetch("/api/get-access-token", {
      method: "POST",
    });
    const token = await response.text();

    return token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error;
  }
}

const DEFAULT_CONFIG: StartAvatarRequest = {
  quality: AvatarQuality.High,
  avatarName: "Judy_Teacher_Sitting_public",
  knowledgeId: undefined,
  voice: {
    rate: 2,
    emotion: VoiceEmotion.EXCITED,
    model: ElevenLabsModel.eleven_flash_v2_5,
  },
  language: "en",
  voiceChatTransport: VoiceChatTransport.WEBSOCKET,
  sttSettings: {
    provider: STTProvider.DEEPGRAM,
  },
};

const Session = ({
  knowledgeBase,
  role,
  avatar,
}: {
  knowledgeBase: string;
  role: string;
  avatar: IAvatar;
}) => {
  const { initAvatar, startAvatar, stopAvatar, sessionState, stream } =
    useStreamingAvatarSession();
  const { startVoiceChat } = useVoiceChat();

  const [config] = useState<StartAvatarRequest>({
    ...DEFAULT_CONFIG,
    knowledgeBase,
    avatarName: avatar?.id || DEFAULT_CONFIG?.avatarName,
  });

  const mediaStream = useRef<HTMLVideoElement>(null);

  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [exitLoading, setExitLoading] = useState(false);
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  // Timer state
  const [startTime, setStartTime] = useState(new Date());
  const [remainingTime, setRemainingTime] = useState(180); // 3 minutes in seconds

  const videoRef = useRef<any>(null);

  // Timer effect - countdown from 3 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor(
        (new Date().getTime() - startTime.getTime()) / 1000,
      );
      const remaining = Math.max(0, 180 - elapsed); // 180 seconds = 3 minutes
      setRemainingTime(remaining);

      // Auto-exit when time is up
      if (remaining === 0) {
        exitSession();
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime]);

  // Get user media
  useEffect(() => {
    if (isCameraOn && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: isMicOn })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.log("Error accessing media devices:", err));
    } else if (!isCameraOn && videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track: any) => track.stop());
      videoRef.current.srcObject = null;
    }
  }, [isCameraOn, isMicOn]);

  useEffect(() => {
    console.log("Session state changed:");
    startSessionV2(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startSessionV2 = useMemoizedFn(async (isVoiceChat: boolean) => {
    try {
      const newToken = await fetchAccessToken();
      const avatar = initAvatar(newToken);

      avatar.on(StreamingEvents.AVATAR_START_TALKING, (e) => {
        console.log("Avatar started talking", e);
      });
      avatar.on(StreamingEvents.AVATAR_STOP_TALKING, (e) => {
        console.log("Avatar stopped talking", e);
      });
      avatar.on(StreamingEvents.STREAM_DISCONNECTED, () => {
        console.log("Stream disconnected");
      });
      avatar.on(StreamingEvents.STREAM_READY, (event) => {
        console.log(">>>>> Stream ready:", event.detail);
        setLoading(false);
        setStartTime(new Date());
      });
      avatar.on(StreamingEvents.USER_START, (event) => {
        console.log(">>>>> User started talking:", event);
      });
      avatar.on(StreamingEvents.USER_STOP, (event) => {
        console.log(">>>>> User stopped talking:", event);
      });
      avatar.on(StreamingEvents.USER_END_MESSAGE, (event) => {
        console.log(">>>>> User end message:", event);
      });
      avatar.on(StreamingEvents.USER_TALKING_MESSAGE, (event) => {
        console.log(">>>>> User talking message:", event);
      });
      avatar.on(StreamingEvents.AVATAR_TALKING_MESSAGE, (event) => {
        console.log(">>>>> Avatar talking message:", event);
      });
      avatar.on(StreamingEvents.AVATAR_END_MESSAGE, (event) => {
        console.log(">>>>> Avatar end message:", event);
      });

      await startAvatar(config);

      if (isVoiceChat) {
        await startVoiceChat();
      }
    } catch (error) {
      console.error("Error starting avatar session:", error);
    }
  });

  useUnmount(() => {
    // Stop all media tracks (camera/microphone)
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track: any) => track.stop());
      videoRef.current.srcObject = null;
    }
    stopAvatar();
  });

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play();
      };
    }
  }, [mediaStream, stream]);

  const formatTime = (seconds: any) => {
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const exitSession = async () => {
    setExitLoading(true);

    // Stop all media tracks (camera/microphone)
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track: any) => track.stop());
      videoRef.current.srcObject = null;
    }

    await stopAvatar();
    setIsSessionComplete(true);
  };

  if (isSessionComplete) {
    return <>Session Complete</>;
  }

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col px-4">
      {loading && <LoadingSkeleton />}
      <div className="flex flex-row items-center justify-between gap-2 py-3">
        <div className="flex items-center gap-1">
          <Brain className="h-6 w-6" />
          <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-lg font-bold text-transparent dark:from-white dark:to-gray-300">
            {appConfig.name}
          </span>
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="relative mr-1">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
            <div className="absolute top-0 left-0 h-2 w-2 animate-ping rounded-full bg-green-400"></div>
            <div className="absolute top-0 left-0 h-2 w-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
          </div>
          <h1 className="text-md overflow-hidden font-semibold text-ellipsis whitespace-nowrap">
            {role || ""}{" "}
          </h1>
          {!loading && (
            <Badge
              variant={remainingTime <= 30 ? "destructive" : "secondary"}
              className="flex shrink-0 items-center"
            >
              <Clock className="h-3 w-3" />
              <span>{formatTime(remainingTime)}</span>
            </Badge>
          )}
        </div>
      </div>
      {/* Main Content */}
      <div className="mx-auto flex w-full flex-1">
        {/* Video Section */}
        <div className="w-full flex-1">
          <div className="no-h-[calc(100vh-140px)] grid h-full grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Avatar Video */}
            <div className="relative overflow-hidden rounded-lg border">
              <div className="absolute top-2 left-2 z-10 rounded bg-black/50 px-2 py-1 backdrop-blur-sm">
                <span className="text-sm font-medium text-white">
                  {avatar.name}
                </span>
              </div>
              <div className="bg-muted relative h-full">
                {sessionState !== StreamingAvatarSessionState.INACTIVE ? (
                  <video
                    playsInline
                    ref={mediaStream}
                    autoPlay
                    className="h-full w-full object-cover"
                  >
                    <track kind="captions" />
                  </video>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <Avatar className="mx-auto mb-4 h-16 w-16">
                        <AvatarFallback className="text-lg">AI</AvatarFallback>
                      </Avatar>
                      <p className="text-muted-foreground">
                        AI Therapist joining soon...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* User Video */}
            <div className="relative overflow-hidden rounded-lg border">
              <div className="absolute top-2 left-2 z-10 rounded bg-black/50 px-2 py-1 backdrop-blur-sm">
                <span className="text-sm font-medium text-white">You</span>
              </div>
              <div className="bg-muted relative h-full">
                {isCameraOn ? (
                  <video
                    playsInline
                    ref={videoRef}
                    autoPlay
                    muted
                    className="h-full w-full object-cover"
                  >
                    <track kind="captions" />
                  </video>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <CameraOff className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
                      <p className="text-muted-foreground">Camera is off</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Controls */}
      <div className="flex justify-center space-x-4 py-4">
        <Button
          variant={isCameraOn ? "default" : "secondary"}
          size="icon"
          onClick={() => setIsCameraOn(!isCameraOn)}
          className="rounded-full"
        >
          {isCameraOn ? <Camera /> : <CameraOff />}
        </Button>
        <Button
          variant={isMicOn ? "default" : "secondary"}
          size="icon"
          onClick={() => setIsMicOn(!isMicOn)}
          className="rounded-full"
        >
          {isMicOn ? <Mic /> : <MicOff />}
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="icon" variant="destructive" className="rounded-full">
              <Phone />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to exit the session?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction disabled={exitLoading} onClick={exitSession}>
                Exit Session
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Session;
