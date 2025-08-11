"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  ArrowRight,
  Home,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

export default function SessionCompleted() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(contentTimer);
  }, []);



  return (
    <div className="flex min-h-screen flex-1 items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <div className="mx-auto max-w-md space-y-6 pt-12">
        {/* Success Animation */}
        <div className="space-y-6 text-center">
          <div
            className={`inline-flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 transition-all duration-1000 ${showContent ? "scale-100 rotate-0" : "scale-0 rotate-180"}`}
          >
            <CheckCircle className="h-12 w-12 text-emerald-600" />
          </div>

          <div
            className={`space-y-3 transition-all delay-300 duration-700 ${showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            <h1 className="text-3xl font-bold text-gray-900">
              Session Complete!
            </h1>
            <p className="text-lg text-gray-600">
              Great work on your mental wellness journey
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className={`space-y-4 transition-all delay-900 duration-700 ${showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <a href="/therapy">
            <Button className="h-14 w-full bg-emerald-600 text-lg font-medium text-white hover:bg-emerald-700">
              Start New Session
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-12 border-gray-200 bg-transparent hover:bg-gray-50"
              asChild
            >
              <Link href="/dashboard">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>

            <Button
              variant="outline"
              className="h-12 border-gray-200 bg-transparent hover:bg-gray-50"
              asChild
            >
              <Link href="/dashboard">
                <BookOpen className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          </div>
        </div>

        {/* Motivational Quote */}
        <div
          className={`py-8 text-center transition-all delay-1100 duration-700 ${showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <p className="text-gray-500 italic">
            &ldquo;Every session is a step forward in your journey to better mental
            health.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
