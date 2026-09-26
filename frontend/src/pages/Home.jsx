import {
  ArrowRight,
  BarChart3,
  Brain,
  FileSearch,
  Gauge,
  MessageSquare,
  Target,
} from "lucide-react";

import Button from "../Components/common/Button";
import Card from "../Components/common/Card";

function Home() {
  const features = [
    {
      icon: FileSearch,
      title: "AI Resume Analysis",
      description:
        "Analyze your resume and identify strengths, weaknesses, and areas that need improvement.",
    },
    {
      icon: Gauge,
      title: "ATS Score",
      description:
        "Understand how well your resume performs against modern Applicant Tracking Systems.",
    },
    {
      icon: Target,
      title: "Skill Gap Analysis",
      description:
        "Discover missing skills and focus your preparation on what matters for your target role.",
    },
    {
      icon: MessageSquare,
      title: "AI Mock Interviews",
      description:
        "Practice realistic technical interviews with questions tailored to your chosen role.",
    },
    {
      icon: BarChart3,
      title: "Interview Performance",
      description:
        "Track your interview scores and see how your preparation improves over time.",
    },
    {
      icon: Brain,
      title: "Career Recommendations",
      description:
        "Get personalized recommendations to improve your skills, resume, and interview readiness.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navigation */}
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-base font-semibold tracking-tight">
              Career Prep AI
            </h1>

            <p className="hidden text-xs text-zinc-500 sm:block">
              AI Career Intelligence
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Sign In
            </Button>

            <Button
              size="sm"
              onClick={() => {
                window.location.href = "/register";
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-28 lg:px-8 lg:pt-32">
            <div className="mx-auto max-w-4xl text-center">
              {/* Badge */}
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-zinc-300">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                AI-Powered Career Preparation
              </div>

              {/* Heading */}
              <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                Prepare Smarter.
                <br />
                <span className="text-zinc-400">
                  Interview Better.
                </span>
                <br />
                Get Hired.
              </h2>

              {/* Description */}
              <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
                Analyze your resume, identify skill gaps, practice technical
                interviews, and track your career preparation — all in one
                intelligent platform.
              </p>

              {/* CTA */}
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  onClick={() => {
                    window.location.href = "/register";
                  }}
                >
                  Get Started
                  <ArrowRight size={18} />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    document
                      .getElementById("features")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                >
                  Explore Features
                </Button>
              </div>
            </div>

            {/* Hero Preview */}
            <div className="mx-auto mt-16 max-w-5xl">
              <Card className="overflow-hidden p-0">
                <div className="border-b border-zinc-800 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  </div>
                </div>

                <div className="grid gap-4 p-5 sm:grid-cols-3">
                  <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
                    <p className="text-xs text-zinc-500">
                      Resume ATS Score
                    </p>

                    <p className="mt-3 text-3xl font-semibold">
                      84
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      / 100
                    </p>
                  </div>

                  <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
                    <p className="text-xs text-zinc-500">
                      Interview Score
                    </p>

                    <p className="mt-3 text-3xl font-semibold">
                      82%
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      Average performance
                    </p>
                  </div>

                  <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
                    <p className="text-xs text-zinc-500">
                      Profile Completion
                    </p>

                    <p className="mt-3 text-3xl font-semibold">
                      92%
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      Almost complete
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="border-t border-zinc-800"
        >
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium text-zinc-500">
                Everything you need
              </p>

              <h3 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Build your career with confidence.
              </h3>

              <p className="mt-4 text-zinc-400">
                One platform to understand where you are, prepare for where
                you're going, and measure your progress.
              </p>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <Card
                    key={feature.title}
                    className="group transition-colors hover:border-zinc-600"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">
                      <Icon
                        size={19}
                        className="text-zinc-300"
                      />
                    </div>

                    <h4 className="mt-5 text-base font-semibold">
                      {feature.title}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {feature.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-zinc-800">
          <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:py-24">
            <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to prepare smarter?
            </h3>

            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Start building better interview skills and a stronger career
              profile today.
            </p>

            <div className="mt-7">
              <Button
                size="lg"
                onClick={() => {
                  window.location.href = "/register";
                }}
              >
                Create Your Account
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-center text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left lg:px-8">
          <p>© 2026 Career Prep AI</p>

          <p>AI Career Intelligence</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;