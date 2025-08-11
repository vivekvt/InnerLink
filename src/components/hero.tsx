"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Brain,
  Heart,
  Sparkles,
  Clock,
  Shield,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { avatars } from "./logic/avatars";
import { AuthButton } from "./navbar";
import Link from "next/link";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentAvatar((prev) => (prev + 1) % avatars.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Innerlink</span>
        </div>
        <div className="flex items-center space-x-4">
          <AuthButton />
        </div>
      </nav>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-6 pt-12 pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            <div className="space-y-4">
              <Badge className="bg-blue-100 px-4 py-2 text-blue-700 hover:bg-blue-100">
                <Sparkles className="mr-2 h-4 w-4" />
                AI-Powered Therapy
              </Badge>

              <h1 className="text-5xl leading-tight font-bold text-gray-900 lg:text-6xl">
                Your Personal
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Therapist
                </span>
                Awaits
              </h1>

              <p className="max-w-lg text-xl leading-relaxed text-gray-600">
                Connect with lifelike AI avatars for personalized therapy
                sessions and guided meditation. Available 24/7, completely
                private, and tailored to your needs.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg text-white hover:from-blue-700 hover:to-purple-700"
                asChild
              >
                <Link href="/therapy">
                  Start Your Session
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              {/* <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 bg-transparent px-8 py-4 text-lg hover:border-blue-600 hover:text-blue-600"
              >
                Watch Demo
              </Button> */}
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-green-600" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>24/7 Available</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Heart className="h-4 w-4 text-red-500" />
                <span>10k+ Sessions</span>
              </div>
            </div>
          </div>

          {/* Right Content - Avatar Showcase */}
          <div
            className={`relative transition-all delay-300 duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            <div className="relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 rotate-3 transform rounded-3xl bg-gradient-to-r from-blue-100 to-purple-100"></div>
              <div className="absolute inset-0 -rotate-3 transform rounded-3xl bg-gradient-to-r from-purple-100 to-pink-100"></div>

              {/* Main Avatar Card */}
              <Card className="relative transform rounded-3xl border-0 bg-white/90 p-8 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:scale-105">
                <div className="space-y-6 text-center">
                  <div className="rounded-fulls mx-auto h-full w-full transform overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 p-1 transition-all duration-500">
                    <div className="rounded-fulls h-full w-full overflow-hidden bg-white">
                      <Image
                        src={avatars[currentAvatar].image || "/placeholder.svg"}
                        alt={`${avatars[currentAvatar].name} - ${avatars[currentAvatar].specialty}`}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover"
                        priority
                      />
                    </div>
                  </div>

                  {/* Avatar Info */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {avatars[currentAvatar].name}
                    </h3>
                    <p className="text-gray-600">
                      {avatars[currentAvatar].specialty}
                    </p>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700"
                    >
                      Available Now
                    </Badge>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex justify-center gap-3">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      asChild
                    >
                      <Link href="/therapy">Start Therapy</Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/meditation">Meditation</Link>
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 flex h-12 w-12 animate-bounce items-center justify-center rounded-full bg-yellow-200">
                <Sparkles className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="absolute -bottom-4 -left-4 flex h-10 w-10 animate-pulse items-center justify-center rounded-full bg-pink-200">
                <Heart className="h-5 w-5 text-pink-600" />
              </div>
            </div>

            {/* Avatar Selector Dots */}
            <div className="mt-6 flex justify-center space-x-2">
              {avatars.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentAvatar(index)}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    index === currentAvatar
                      ? "scale-125 bg-blue-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className={`mt-20 grid grid-cols-2 gap-8 transition-all delay-500 duration-1000 md:grid-cols-4 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          {[
            { number: "10,000+", label: "Therapy Sessions" },
            { number: "24/7", label: "Availability" },
            { number: "95%", label: "User Satisfaction" },
            { number: "5min", label: "Average Wait Time" },
          ].map((stat, index) => (
            <div key={index} className="space-y-2 text-center">
              <div className="text-3xl font-bold text-gray-900">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
