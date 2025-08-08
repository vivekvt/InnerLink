import ProfileGuard from "@/components/profile-guard";
import { getMe } from "@/actions/user";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Brain,
  Heart,
  User,
  HeadphonesIcon,
  PlayCircle,
  Sparkles,
} from "lucide-react";

export default async function DashboardPage() {
  const user = await getMe();

  if (!user) {
    redirect("/login");
  }

  return (
    <ProfileGuard>
      <div className="container mx-auto min-h-[calc(100vh-64px)] px-4 py-8">
        <div className="space-y-8">
          {/* Welcome Header */}
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 dark:from-blue-950 dark:to-purple-950">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Welcome back to your wellness journey
              </span>
            </div>
            <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold text-transparent dark:from-white dark:to-gray-300">
              Hello, {user.name}!
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Ready to connect with your inner self? Choose how you'd like to
              start your session today.
            </p>
          </div>

          {/* Main Session Cards */}
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            {/* Therapy Session Card */}
            <div className="group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-blue-50/50 to-cyan-50/50 p-8 transition-all duration-300 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 dark:from-blue-950/20 dark:to-cyan-950/20 dark:hover:border-blue-800">
              <div className="absolute top-4 right-4">
                <div className="rounded-full bg-blue-100 p-3 transition-colors group-hover:bg-blue-200 dark:bg-blue-900/50 dark:group-hover:bg-blue-800/50">
                  <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    AI Therapy Session
                  </h3>
                  <p className="text-muted-foreground">
                    Connect with our AI-powered therapist for personalized
                    guidance and support. Experience empathetic conversations
                    designed to help you process emotions and find clarity.
                  </p>
                </div>

                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>Emotional Support</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <PlayCircle className="h-4 w-4" />
                    <span>Available 24/7</span>
                  </div>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="w-full transition-shadow group-hover:shadow-md"
                >
                  <Link href="/therapy" className="flex items-center gap-2">
                    <PlayCircle className="h-5 w-5" />
                    Start Therapy Session
                  </Link>
                </Button>
              </div>
            </div>

            {/* Meditation Session Card */}
            <div className="group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-green-50/50 to-emerald-50/50 p-8 transition-all duration-300 hover:border-green-200 hover:shadow-lg hover:shadow-green-500/10 dark:from-green-950/20 dark:to-emerald-950/20 dark:hover:border-green-800">
              <div className="absolute top-4 right-4">
                <div className="rounded-full bg-green-100 p-3 transition-colors group-hover:bg-green-200 dark:bg-green-900/50 dark:group-hover:bg-green-800/50">
                  <HeadphonesIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Guided Meditation
                  </h3>
                  <p className="text-muted-foreground">
                    Find your center with AI-guided meditation sessions. Choose
                    from breathing exercises, mindfulness practices, and
                    relaxation techniques tailored to your needs.
                  </p>
                </div>

                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Sparkles className="h-4 w-4" />
                    <span>Mindfulness</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>Inner Peace</span>
                  </div>
                </div>

                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="w-full transition-shadow group-hover:shadow-md"
                >
                  <Link href="/meditation" className="flex items-center gap-2">
                    <HeadphonesIcon className="h-5 w-5" />
                    Start Meditation Session
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Additional Dashboard Items */}
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
            <div className="bg-card rounded-xl border p-6 transition-shadow hover:shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900/50">
                  <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold">Profile</h3>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">
                Manage your account settings and personalize your wellness
                journey
              </p>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link href="/profile">View Profile</Link>
              </Button>
            </div>

            <div className="bg-card rounded-xl border p-6 transition-shadow hover:shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-orange-100 p-2 dark:bg-orange-900/50">
                  <Sparkles className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold">Session History</h3>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">
                Track your progress and review previous therapy and meditation
                sessions
              </p>
              <Button variant="outline" size="sm" className="w-full" disabled>
                Coming Soon
              </Button>
            </div>

            <div className="bg-card rounded-xl border p-6 transition-shadow hover:shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/50">
                  <Heart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold">Wellness Insights</h3>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">
                Get personalized insights and recommendations for your mental
                health
              </p>
              <Button variant="outline" size="sm" className="w-full" disabled>
                Coming Soon
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProfileGuard>
  );
}
