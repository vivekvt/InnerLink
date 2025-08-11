"use client";

import { useEffect, useState } from "react";
import { Brain, Video, Shield, Heart } from "lucide-react";

const steps = [
  { icon: Shield, text: "Securing connection" },
  { icon: Video, text: "Preparing video" },
  { icon: Brain, text: "Loading AI therapist" },
  { icon: Heart, text: "Ready for session" },
];

export default function LoadingSkeleton() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepDuration = 2000; // 1.25 seconds per step
    const totalDuration = steps.length * stepDuration;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / totalDuration) * 100;

        // Update current step based on progress
        const stepIndex = Math.floor((newProgress / 100) * steps.length);
        setCurrentStep(Math.min(stepIndex, steps.length - 1));

        if (newProgress >= 95) {
          clearInterval(interval);
          return 95;
        }

        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = steps[currentStep]?.icon || Brain;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white p-4">
      <div className="mx-auto w-full max-w-sm space-y-8 text-center">
        {/* Main Loading Icon */}
        <div className="relative">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
            <Video className="h-10 w-10 text-emerald-600" />
          </div>

          {/* Animated ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="h-24 w-24 animate-spin rounded-full border-2 border-emerald-100"
              style={{ animationDuration: "2s" }}
            ></div>
          </div>
        </div>

        {/* Current Step */}
        <div className="space-y-4">
          <p className="text-lg font-medium text-gray-700">
            {steps[currentStep]?.text || "Loading..."}
          </p>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="h-1 w-full rounded-full bg-gray-100">
              <div
                className="h-1 rounded-full bg-emerald-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">{Math.round(progress)}%</p>
          </div>
        </div>

        {/* Steps Indicator */}
        <div className="flex justify-center space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index <= currentStep ? "bg-emerald-500" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Footer Message */}
        <p className="px-4 text-sm text-gray-500">
          Preparing your secure session
        </p>
      </div>
    </div>
  );
}
