import { useEffect, useState } from "react";

import {
  ArrowUpRight,
  BarChart3,
  FileText,
  MessageSquare,
  Sparkles,
  UserCheck,
} from "lucide-react";

import Card from "../Components/common/Card";
import StatCard from "../Components/common/StatCard";
import Badge from "../Components/common/Badge";
import Button from "../Components/common/Button";

import api from "../services/api";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/dashboard");

        console.log("Dashboard data:", response.data);

        setDashboard(response.data);
      } catch (error) {
        console.error("Failed to load dashboard:", error);

        if (error.response) {
          console.error(
            "Dashboard error response:",
            error.response.data
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-zinc-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-red-400">
          Failed to load dashboard.
        </p>
      </div>
    );
  }

  const {
    name,
    email,
    resumeCount,
    latestResume,
    totalInterviews,
    averageInterviewScore,
  } = dashboard;

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-zinc-500">
          Overview
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Good morning, {name}
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Track your career preparation progress.
        </p>
      </div>

      {/* Statistics */}
      <section>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* Total Interviews */}
          <StatCard
            title="Total Interviews"
            value={totalInterviews}
            description="Completed attempts"
            icon={MessageSquare}
          />

          {/* Average Interview Score */}
          <StatCard
            title="Average Interview Score"
            value={`${averageInterviewScore}%`}
            description="Across all interviews"
            icon={BarChart3}
          />

          {/* Resume Count */}
          <StatCard
            title="Resume Count"
            value={resumeCount}
            description="Uploaded resumes"
            icon={FileText}
          />

          {/* Profile */}
          <StatCard
            title="Profile"
            value={email}
            description="Your account"
            icon={UserCheck}
          />

        </div>
      </section>

      {/* Dashboard Information */}
      <section className="grid gap-6 xl:grid-cols-3">

        {/* Latest Resume */}
        <Card className="xl:col-span-2">
          <div>
            <h2 className="text-base font-semibold text-white">
              Latest Resume
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Your most recently uploaded resume.
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-5">

            {latestResume ? (
              <div className="flex items-center gap-4">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800">
                  <FileText
                    size={18}
                    className="text-zinc-400"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-white">
                    {latestResume.originalFileName}
                  </h3>

                  <p className="mt-1 text-xs text-zinc-500">
                    Latest uploaded resume
                  </p>
                </div>

              </div>
            ) : (
              <div className="py-6 text-center">

                <FileText
                  size={28}
                  className="mx-auto text-zinc-600"
                />

                <p className="mt-3 text-sm text-zinc-500">
                  No resume uploaded yet.
                </p>

                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    window.location.href = "/resume";
                  }}
                >
                  Upload Resume

                  <ArrowUpRight size={16} />
                </Button>

              </div>
            )}

          </div>
        </Card>

        {/* Career Preparation */}
        <Card className="flex flex-col">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950">
              <Sparkles
                size={19}
                className="text-zinc-300"
              />
            </div>

            <div>
              <h2 className="text-base font-semibold">
                Career Preparation
              </h2>

              <p className="text-xs text-zinc-500">
                Keep improving your skills
              </p>
            </div>

          </div>

          <div className="mt-6 flex-1">

            <p className="text-sm leading-7 text-zinc-400">
              Upload your resume and start practicing interviews
              to improve your career preparation.
            </p>

          </div>

          <Button
            variant="outline"
            className="mt-6 w-full"
            onClick={() => {
              window.location.href = "/interview";
            }}
          >
            Practice Interview

            <ArrowUpRight size={16} />
          </Button>

        </Card>

      </section>

      {/* Current Account */}
      <section>

        <div className="mb-4">

          <h2 className="text-base font-semibold">
            Account Information
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Information retrieved from your backend.
          </p>

        </div>

        <Card padding={false}>

          <div className="divide-y divide-zinc-800">

            {/* Name */}
            <div className="flex items-center justify-between px-5 py-5">

              <span className="text-sm text-zinc-500">
                Name
              </span>

              <span className="text-sm font-medium text-white">
                {name}
              </span>

            </div>

            {/* Email */}
            <div className="flex items-center justify-between px-5 py-5">

              <span className="text-sm text-zinc-500">
                Email
              </span>

              <span className="text-sm font-medium text-white">
                {email}
              </span>

            </div>

            {/* Resumes */}
            <div className="flex items-center justify-between px-5 py-5">

              <span className="text-sm text-zinc-500">
                Resumes
              </span>

              <Badge>
                {resumeCount}
              </Badge>

            </div>

            {/* Interviews */}
            <div className="flex items-center justify-between px-5 py-5">

              <span className="text-sm text-zinc-500">
                Completed Interviews
              </span>

              <Badge>
                {totalInterviews}
              </Badge>

            </div>

            {/* Average Score */}
            <div className="flex items-center justify-between px-5 py-5">

              <span className="text-sm text-zinc-500">
                Average Interview Score
              </span>

              <Badge>
                {averageInterviewScore}%
              </Badge>

            </div>

          </div>

        </Card>

      </section>

    </div>
  );
}

export default Dashboard;