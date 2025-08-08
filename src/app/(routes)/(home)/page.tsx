import { appConfig } from "@/lib/appConfig";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// Corrected mentors array with proper image paths
const mentors = [
  {
    id: "Elenora_IT_Sitting_public",
    image: "/ai/Elenora_IT_Sitting_public.webp",
    name: "Elenora",
    specialty: "Cognitive Behavioral Therapy",
  },
  {
    id: "Judy_Teacher_Sitting_public",
    image: "/ai/Judy_Teacher_Sitting_public.webp",
    name: "Judy",
    specialty: "Mindfulness & Meditation",
  },
  {
    id: "June_HR_public",
    image: "/ai/June_HR_public.webp",
    name: "June",
    specialty: "Workplace Wellness",
  },
  {
    id: "SilasHR_public",
    image: "/ai/SilasHR_public.webp",
    name: "Silas",
    specialty: "Anxiety & Stress Management",
  },
  {
    id: "Bryan_IT_Sitting_public",
    image: "/ai/Bryan_IT_Sitting_public.webp",
    name: "Bryan",
    specialty: "Tech Professional Support",
  },
  {
    id: "Wayne_20240711",
    image: "/ai/Wayne_20240711.webp",
    name: "Wayne",
    specialty: "Life Coaching & Goals",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-20">
        <div className="absolute inset-0 bg-white/50 dark:bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl text-center">
          <div className="mb-8">
            <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
              {appConfig.name}
            </h1>
            <p className="mb-4 text-xl font-medium text-gray-600 md:text-2xl dark:text-gray-300">
              {appConfig.tagline}
            </p>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              {appConfig.description}
            </p>
          </div>

          <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="px-8 py-6 text-lg font-semibold"
              asChild
            >
              <Link href="/dashboard">Start Your Journey</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* AI Therapists Section */}
      <section className="bg-white px-4 py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
              Meet Your AI Therapists
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-400">
              Choose from our diverse team of AI-powered therapists, each
              specialized in different areas of mental health and wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {mentors.map((mentor) => (
              <div
                key={mentor.id}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                    {mentor.name}
                  </h3>
                  <p className="mb-3 font-medium text-blue-600 dark:text-blue-400">
                    {mentor.specialty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 px-4 py-20 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
              Why Choose InnerLink?
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-400">
              Experience the future of mental health support with our
              cutting-edge AI technology and personalized approach.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-900">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                <svg
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                24/7 Availability
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access support whenever you need it, day or night. Your AI
                therapist is always there for you.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-900">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                <svg
                  className="h-6 w-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Personalized Care
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Each session is tailored to your unique needs, goals, and mental
                health journey.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-900">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                <svg
                  className="h-6 w-6 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Complete Privacy
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your conversations are completely confidential and secure. Your
                privacy is our priority.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-900">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900">
                <svg
                  className="h-6 w-6 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Evidence-Based
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our AI therapists use proven therapeutic techniques and
                evidence-based approaches.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-900">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900">
                <svg
                  className="h-6 w-6 text-yellow-600 dark:text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Instant Response
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get immediate support and guidance without waiting for
                appointments or callbacks.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-900">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900">
                <svg
                  className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Progress Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Monitor your mental health journey with detailed insights and
                progress reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Ready to Transform Your Mental Health?
          </h2>
          <p className="mb-8 text-xl leading-relaxed text-blue-100">
            Join thousands of users who have found peace, clarity, and healing
            through InnerLink. Your journey to better mental health starts with
            a single click.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="default"
              className="bg-white px-8 py-6 text-lg font-semibold text-blue-600 hover:bg-gray-100"
              asChild
            >
              <Link href="/login">Start Free Today</Link>
            </Button>
            <Button
              size="lg"
              variant="default"
              className="border-white px-8 py-6 text-lg font-semibold hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link href="/complete-profile">Learn More</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-blue-200">
            No credit card required • Start your free journey today
          </p>
        </div>
      </section>
    </div>
  );
}
