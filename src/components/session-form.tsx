"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Sparkles, ArrowRight } from "lucide-react";
import { avatars, IAvatar } from "@/components/logic/avatars";
import { getMe } from "@/actions/user";
import Image from "next/image";
import Navbar from "./navbar";

export interface SessionData {
  userName: string;
  selectedAvatar: IAvatar;
  currentMood: string;
  sessionFocus: string;
  additionalDetails?: string;
}

interface SessionFormProps {
  sessionType: "therapy" | "meditation";
  onStart: (data: SessionData) => void;
}

export default function SessionForm({
  sessionType,
  onStart,
}: SessionFormProps) {
  const [userName, setUserName] = useState<string>("");
  const [selectedAvatar, setSelectedAvatar] = useState<IAvatar | null>(null);
  const [currentMood, setCurrentMood] = useState<string>("");
  const [sessionFocus, setSessionFocus] = useState<string>("");
  const [additionalDetails, setAdditionalDetails] = useState<string>("");

  // Get user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getMe();
      if (user?.name) {
        setUserName(user.name);
      }
    };
    fetchUser();
  }, []);

  const handleStart = () => {
    if (selectedAvatar && currentMood && sessionFocus) {
      onStart({
        userName,
        selectedAvatar,
        currentMood,
        sessionFocus,
        additionalDetails: additionalDetails.trim() || undefined,
      });
    }
  };

  const isTherapy = sessionType === "therapy";

  const moodOptions = [
    { value: "stressed", label: "Stressed", emoji: "😰" },
    { value: "anxious", label: "Anxious", emoji: "😟" },
    { value: "sad", label: "Sad", emoji: "😢" },
    { value: "overwhelmed", label: "Overwhelmed", emoji: "🤯" },
    { value: "restless", label: "Restless", emoji: "😤" },
    { value: "tired", label: "Tired", emoji: "😴" },
  ];

  const therapyFocusOptions = [
    { value: "work-stress", label: "Work Stress" },
    { value: "relationships", label: "Relationships" },
    { value: "self-care", label: "Self-care" },
    { value: "life-changes", label: "Life Changes" },
    { value: "emotions", label: "Process Emotions" },
    { value: "general", label: "General Support" },
  ];

  const meditationFocusOptions = [
    { value: "stress-relief", label: "Stress Relief" },
    { value: "focus", label: "Better Focus" },
    { value: "sleep", label: "Better Sleep" },
    { value: "anxiety", label: "Calm Anxiety" },
    { value: "mindfulness", label: "Mindfulness" },
    { value: "energy", label: "Boost Energy" },
  ];

  const focusOptions = isTherapy ? therapyFocusOptions : meditationFocusOptions;

  return (
    <>
      <Navbar />
      <div className="pb-4">
        <div className="mx-auto max-w-2xl pt-12">
          <div className="rounded-2xl border bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                {isTherapy ? (
                  <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                ) : (
                  <Sparkles className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                )}
              </div>
              <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                Ready for your {sessionType} session, {userName}?
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                                  Choose your guide and let us know how you&apos;re feeling
              </p>
            </div>

            <div className="space-y-8">
              {/* Avatar Selection */}
              <div>
                <Label className="mb-4 block text-base font-medium">
                  Choose your {isTherapy ? "therapist" : "meditation guide"}
                </Label>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {avatars.map((avatar) => (
                    <div
                      key={avatar.id}
                      className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all hover:shadow-md ${
                        selectedAvatar?.id === avatar.id
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                      onClick={() => setSelectedAvatar(avatar)}
                    >
                      <div className="text-center">
                        <div className="relative mx-auto mb-3 h-16 w-16 overflow-hidden rounded-full">
                          <Image
                            src={avatar.image}
                            alt={avatar.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {avatar.name}
                        </h3>
                        <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                          {avatar.specialty}
                        </p>
                      </div>
                      {selectedAvatar?.id === avatar.id && (
                        <div className="absolute top-2 right-2 h-4 w-4 rounded-full bg-blue-500">
                          <div className="h-full w-full scale-50 rounded-full bg-white"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mood Selection */}
              <div>
                <Label className="mb-3 block text-base font-medium">
                  How are you feeling?
                </Label>
                <RadioGroup
                  value={currentMood}
                  onValueChange={setCurrentMood}
                  className="grid grid-cols-2 gap-3"
                >
                  {moodOptions.map((mood) => (
                    <div
                      key={mood.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={mood.value} id={mood.value} />
                      <Label
                        htmlFor={mood.value}
                        className="flex cursor-pointer items-center gap-2 text-sm"
                      >
                        <span>{mood.emoji}</span>
                        {mood.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Focus Area */}
              <div>
                <Label className="mb-3 block text-base font-medium">
                  What&apos;s your focus today?
                </Label>
                <RadioGroup
                  value={sessionFocus}
                  onValueChange={setSessionFocus}
                  className="grid grid-cols-1 gap-2 md:grid-cols-2"
                >
                  {focusOptions.map((focus) => (
                    <div
                      key={focus.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={focus.value} id={focus.value} />
                      <Label
                        htmlFor={focus.value}
                        className="cursor-pointer text-sm"
                      >
                        {focus.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Additional Details */}
              <div>
                <Label className="mb-3 block text-base font-medium">
                  Anything else you&apos;d like to share? (Optional)
                </Label>
                <Textarea
                  value={additionalDetails}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setAdditionalDetails(e.target.value)
                  }
                  placeholder={
                    isTherapy
                      ? "Share any recent events, specific concerns, or what you hope to achieve..."
                      : "Share what's been on your mind or what you'd like to focus on during meditation..."
                  }
                  className="min-h-[80px] resize-none"
                  maxLength={200}
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {additionalDetails.length}/200 characters
                </p>
              </div>

              {/* Start Button */}
              <Button
                onClick={handleStart}
                disabled={!selectedAvatar || !currentMood || !sessionFocus}
                className="h-12 w-full text-base font-medium"
                size="lg"
              >
                Start {sessionType === "therapy" ? "Therapy" : "Meditation"}{" "}
                Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
              Your responses personalize the session but are not stored
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
