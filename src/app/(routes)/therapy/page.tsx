"use client";

import { StreamingAvatarProvider } from "@/components/logic";
import Session from "@/components/session";
import SessionCompleted from "@/components/session-completed";
import SessionForm, { SessionData } from "@/components/session-form";
import { getTherapySystemPrompt } from "@/lib/session-prompts";
import React, { useState } from "react";

export default function TherapyPage() {
  const [status, setStatus] = useState<"initial" | "started" | "completed">(
    "initial",
  );
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  return (
    <StreamingAvatarProvider>
      <>
        {status === "completed" ? (
          <SessionCompleted />
        ) : status === "started" ? (
          <Session
            avatar={sessionData!.selectedAvatar}
            role={"Therapy Session"}
            knowledgeBase={getTherapySystemPrompt(sessionData!)}
          />
        ) : (
          <SessionForm
            sessionType="therapy"
            onStart={(data) => {
              setSessionData(data);
              setStatus("started");
            }}
          />
        )}
      </>
    </StreamingAvatarProvider>
  );
}
