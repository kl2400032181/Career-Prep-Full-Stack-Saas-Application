import { useEffect, useMemo, useState } from "react";
import {
  FileText,
  Search,
  Eye,
  CalendarDays,
  Briefcase,
  MessageSquare,
  RotateCcw,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

import Card from "../Components/common/Card";
import Button from "../Components/common/Button";
import Badge from "../Components/common/Badge";
import Modal from "../components/common/Modal";
import api from "../services/api";

function getScoreClass(score) {
  if (score >= 80) {
    return "border-zinc-700 bg-zinc-100 text-zinc-950";
  }

  if (score >= 60) {
    return "border-zinc-700 bg-zinc-800 text-white";
  }

  return "border-zinc-700 bg-zinc-900 text-zinc-400";
}

function formatDate(date) {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function History() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [interviews, setInterviews] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState("");

  const filters = ["All", "Interview"];

  // =========================
  // FETCH INTERVIEW HISTORY
  // =========================
  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/interviews");

      console.log("Interview history:", response.data);

      setInterviews(response.data || []);
    } catch (err) {
      console.error("History error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load interview history."
      );

      toast.error("Failed to load interview history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // =========================
  // CONVERT BACKEND DATA
  // =========================
  const historyData = useMemo(() => {
    return interviews.map((interview) => ({
      id: interview.id,
      type: "Interview",
      title: interview.role || "Interview",
      subtitle: `${interview.totalQuestions || 0} Questions`,
      score: interview.score ?? 0,
      date: formatDate(
        interview.completedAt || interview.startedAt
      ),
      status: interview.status || "STARTED",
      raw: interview,
    }));
  }, [interviews]);

  // =========================
  // FILTER + SEARCH
  // =========================
  const filteredHistory = useMemo(() => {
    return historyData.filter((item) => {
      const matchesFilter =
        activeFilter === "All" || item.type === activeFilter;

      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        item.title.toLowerCase().includes(search) ||
        item.subtitle.toLowerCase().includes(search) ||
        item.status.toLowerCase().includes(search);

      return matchesFilter && matchesSearch;
    });
  }, [historyData, activeFilter, searchTerm]);

  // =========================
  // STATS
  // =========================
  const totalInterviews = interviews.length;

  const completedInterviews = interviews.filter(
    (item) => item.status?.toUpperCase() === "COMPLETED"
  );

  const averageScore =
    completedInterviews.length > 0
      ? Math.round(
          completedInterviews.reduce(
            (sum, item) => sum + (item.score || 0),
            0
          ) / completedInterviews.length
        )
      : 0;

  const latestActivity =
    interviews.length > 0
      ? formatDate(
          interviews[0].completedAt ||
            interviews[0].startedAt
        )
      : "No activity";

  // =========================
  // VIEW DETAILS
  // =========================
  const handleView = async (item) => {
    try {
      setDetailsLoading(true);

      const response = await api.get(`/interviews/${item.id}`);

      console.log("Interview details:", response.data);

      setSelectedItem(response.data);
    } catch (err) {
      console.error("Interview details error:", err);
      toast.error("Failed to load interview details.");
    } finally {
      setDetailsLoading(false);
    }
  };

  // =========================
  // REPEAT
  // =========================
  const handleRepeat = () => {
    toast.success(
      "You can start a new interview from the Interview page."
    );
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          History
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          View your previous interview sessions.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
              <FileText size={20} className="text-zinc-300" />
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                Resume Analyses
              </p>
              <p className="mt-1 text-2xl font-bold text-white">
                -
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
              <MessageSquare
                size={20}
                className="text-zinc-300"
              />
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                Interviews
              </p>
              <p className="mt-1 text-2xl font-bold text-white">
                {totalInterviews}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
              <Briefcase
                size={20}
                className="text-zinc-300"
              />
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                Avg. Interview
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {averageScore}%
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
              <CalendarDays
                size={20}
                className="text-zinc-300"
              />
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                Latest Activity
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                {latestActivity}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* FILTERS */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                  activeFilter === filter
                    ? "border-white bg-white text-black"
                    : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-600 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              placeholder="Search history..."
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-500"
            />
          </div>
        </div>
      </Card>

      {/* HISTORY LIST */}
      <Card className="overflow-hidden">
        <div className="border-b border-zinc-800 px-5 py-4">
          <h2 className="font-semibold text-white">
            Activity History
          </h2>

          <p className="mt-1 text-xs text-zinc-500">
            {filteredHistory.length} result
            {filteredHistory.length !== 1 ? "s" : ""}
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center px-6 py-16">
            <Loader2
              size={30}
              className="animate-spin text-zinc-400"
            />

            <p className="mt-3 text-sm text-zinc-500">
              Loading interview history...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <p className="text-sm text-red-400">{error}</p>

            <Button
              variant="secondary"
              className="mt-5"
              onClick={fetchHistory}
            >
              <RotateCcw size={16} />
              Retry
            </Button>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="rounded-full border border-zinc-800 bg-zinc-900 p-4">
              <Search size={24} className="text-zinc-500" />
            </div>

            <h3 className="mt-4 font-semibold text-white">
              No interview history
            </h3>

            <p className="mt-1 max-w-sm text-sm text-zinc-500">
              Complete an interview to see it here.
            </p>

            <Button
              variant="secondary"
              className="mt-5"
              onClick={() => {
                setActiveFilter("All");
                setSearchTerm("");
              }}
            >
              <RotateCcw size={16} />
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 px-5 py-5 transition hover:bg-zinc-900/40 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* LEFT */}
                <div className="flex min-w-0 items-start gap-4">
                  <div className="shrink-0 rounded-xl border border-zinc-800 bg-zinc-900 p-3">
                    <MessageSquare
                      size={20}
                      className="text-zinc-300"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate font-semibold text-white">
                        {item.title}
                      </h3>

                      <Badge>{item.type}</Badge>
                    </div>

                    <p className="mt-1 text-sm text-zinc-500">
                      {item.subtitle}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-600">
                      <span>{item.date}</span>

                      <span>•</span>

                      <span>{item.status}</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-sm font-bold ${getScoreClass(
                      item.score
                    )}`}
                  >
                    {item.score}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleView(item)}
                      className="rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 text-zinc-400 transition hover:border-zinc-600 hover:text-white"
                      aria-label={`View ${item.title}`}
                      title="View details"
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRepeat(item)}
                      className="rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 text-zinc-400 transition hover:border-zinc-600 hover:text-white"
                      aria-label={`Repeat ${item.title}`}
                      title="Repeat"
                    >
                      <RotateCcw size={17} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* DETAILS MODAL */}
      <Modal
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.role || "Interview Details"}
      >
        {detailsLoading ? (
          <div className="flex justify-center py-10">
            <Loader2
              size={30}
              className="animate-spin text-zinc-400"
            />
          </div>
        ) : (
          selectedItem && (
            <div className="space-y-5">
              {/* SUMMARY */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                  <p className="text-xs text-zinc-500">
                    Role
                  </p>

                  <p className="mt-1 font-semibold text-white">
                    {selectedItem.role}
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                  <p className="text-xs text-zinc-500">
                    Score
                  </p>

                  <p className="mt-1 text-xl font-bold text-white">
                    {selectedItem.score ?? 0}%
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                  <p className="text-xs text-zinc-500">
                    Questions
                  </p>

                  <p className="mt-1 font-semibold text-white">
                    {selectedItem.totalQuestions}
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                  <p className="text-xs text-zinc-500">
                    Status
                  </p>

                  <p className="mt-1 font-semibold text-white">
                    {selectedItem.status}
                  </p>
                </div>
              </div>

              {/* QUESTIONS */}
              <div>
                <h3 className="mb-3 font-semibold text-white">
                  Interview Questions
                </h3>

                <div className="space-y-4">
                  {selectedItem.questions?.length > 0 ? (
                    selectedItem.questions.map(
                      (question, index) => (
                        <div
                          key={question.id || index}
                          className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
                        >
                          <p className="text-sm font-semibold text-white">
                            Q{question.questionNumber || index + 1}.{" "}
                            {question.questionText}
                          </p>

                          <div className="mt-3">
                            <p className="text-xs text-zinc-500">
                              Your Answer
                            </p>

                            <p className="mt-1 text-sm leading-6 text-zinc-300">
                              {question.answerText ||
                                "No answer submitted."}
                            </p>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-4">
                            <span className="text-xs text-zinc-500">
                              Score:{" "}
                              <span className="font-semibold text-white">
                                {question.score ?? 0}%
                              </span>
                            </span>
                          </div>

                          {question.feedback && (
                            <div className="mt-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3">
                              <p className="text-xs text-zinc-500">
                                Feedback
                              </p>

                              <p className="mt-1 text-sm text-zinc-300">
                                {question.feedback}
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    )
                  ) : (
                    <p className="text-sm text-zinc-500">
                      No questions available.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => setSelectedItem(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          )
        )}
      </Modal>
    </div>
  );
}

export default History;