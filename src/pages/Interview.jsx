import { useState } from "react";
import toast from "react-hot-toast";

import {
  Brain,
  CheckCircle2,
  Clock3,
  Target,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  LayoutDashboard,
} from "lucide-react";

import Card from "../Components/common/Card";
import Button from "../Components/common/Button";
import Badge from "../Components/common/Badge";
import api from "../services/api";

const QUESTION_BANK = {
  "Frontend Developer": [
    "What is the difference between let, const, and var in JavaScript?",
    "What are React components and why are reusable components useful?",
    "What is the Virtual DOM in React?",
    "What is the difference between props and state in React?",
    "What is event delegation in JavaScript?",
  ],

  "Backend Developer": [
    "What is the difference between authentication and authorization?",
    "What is REST API and what are its main principles?",
    "What is the difference between SQL and NoSQL databases?",
    "What is dependency injection in Spring Boot?",
    "What is the purpose of HTTP status codes?",
  ],

  "Full Stack Developer": [
    "Explain the difference between frontend and backend development.",
    "How does a REST API connect a frontend application with a backend?",
    "What is JWT authentication and how does it work?",
    "What is CORS and why is it required in web applications?",
    "How would you design a scalable full-stack application?",
  ],

  "Java Developer": [
    "What is the difference between an interface and an abstract class in Java?",
    "Explain the four pillars of Object-Oriented Programming.",
    "What is the difference between ArrayList and LinkedList?",
    "What is exception handling in Java?",
    "What is the difference between HashMap and HashSet?",
  ],

  "React Developer": [
    "What are React components?",
    "What is the difference between props and state?",
    "What are React Hooks?",
    "What is useEffect used for in React?",
    "Why are keys important when rendering lists in React?",
  ],

  "Software Engineer": [
    "What is the difference between a process and a thread?",
    "What are the SOLID principles?",
    "What is a database index and why is it useful?",
    "What is time complexity and why is it important?",
    "How would you design a scalable web application?",
  ],
};

function Interview() {
  const [screen, setScreen] = useState("setup");

  const [role, setRole] = useState("Frontend Developer");
  const [difficulty, setDifficulty] = useState("Medium");
  const [questionCount, setQuestionCount] = useState(5);

  const [interviewId, setInterviewId] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [answers, setAnswers] = useState([]);
  const [submittedAnswers, setSubmittedAnswers] = useState([]);

  const [score, setScore] = useState(0);
  const [interviewResult, setInterviewResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [submittingAnswer, setSubmittingAnswer] = useState(false);

  const currentQuestion = questions[questionIndex];

  const progress =
    questions.length > 0
      ? ((questionIndex + 1) / questions.length) * 100
      : 0;

  /*
   * -----------------------------------------
   * START INTERVIEW
   * -----------------------------------------
   */

  const startInterview = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      /*
       * Step 1:
       * Create interview in backend
       *
       * POST /api/interviews/start?role=...&totalQuestions=...
       */

      const startResponse = await api.post("/interviews/start", null, {
        params: {
          role,
          totalQuestions: questionCount,
        },
      });

      const interview = startResponse.data;

      setInterviewId(interview.id);

      /*
       * Step 2:
       * Select questions from our basic question bank.
       *
       * Later Gemini will generate these.
       */

      const bank = QUESTION_BANK[role] || QUESTION_BANK["Software Engineer"];

      const selectedQuestions = bank.slice(0, questionCount);

      /*
       * Step 3:
       * Create every question in backend.
       */

      const createdQuestions = [];

      for (let index = 0; index < selectedQuestions.length; index++) {
        const questionResponse = await api.post(
          `/interviews/${interview.id}/questions`,
          {
            questionNumber: index + 1,
            questionText: selectedQuestions[index],
          }
        );

        const latestInterview = questionResponse.data;

        const createdQuestion =
          latestInterview.questions?.find(
            (question) => question.questionNumber === index + 1
          );

        if (createdQuestion) {
          createdQuestions.push(createdQuestion);
        }
      }

      /*
       * If backend returned all questions correctly,
       * use them directly.
       */

      if (createdQuestions.length !== questionCount) {
        throw new Error("Questions could not be created correctly.");
      }

      setQuestions(createdQuestions);

      setAnswers(new Array(questionCount).fill(""));
      setSubmittedAnswers(new Array(questionCount).fill(false));

      setQuestionIndex(0);
      setScore(0);
      setInterviewResult(null);

      setScreen("interview");

      toast.success("Interview started successfully!");
    } catch (error) {
      console.error("Failed to start interview:", error);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to start interview.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  /*
   * -----------------------------------------
   * UPDATE ANSWER
   * -----------------------------------------
   */

  const updateAnswer = (event) => {
    const updatedAnswers = [...answers];

    updatedAnswers[questionIndex] = event.target.value;

    setAnswers(updatedAnswers);
  };

  /*
   * -----------------------------------------
   * BASIC ANSWER EVALUATION
   * -----------------------------------------
   *
   * This is temporary.
   *
   * Later Gemini will evaluate:
   * answer + question
   * and generate score + feedback.
   */

  const calculateBasicScore = (answer) => {
    const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;

    if (wordCount === 0) {
      return 0;
    }

    if (wordCount < 10) {
      return 4;
    }

    if (wordCount < 25) {
      return 6;
    }

    if (wordCount < 50) {
      return 8;
    }

    return 9;
  };

  const generateBasicFeedback = (answer) => {
    const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;

    if (wordCount < 10) {
      return "Your answer is too short. Explain the concept with more details.";
    }

    if (wordCount < 25) {
      return "Good start. Add examples and explain the concept more clearly.";
    }

    if (wordCount < 50) {
      return "Good answer. Try adding a practical example or use case.";
    }

    return "Good detailed answer. Continue explaining concepts clearly and with examples.";
  };

  /*
   * -----------------------------------------
   * SUBMIT CURRENT ANSWER
   * -----------------------------------------
   */

  const submitCurrentAnswer = async () => {
    if (!currentQuestion) {
      return false;
    }

    const answer = answers[questionIndex]?.trim();

    if (!answer) {
      toast.error("Please answer this question first.");
      return false;
    }

    /*
     * Prevent submitting the same question twice.
     */

    if (submittedAnswers[questionIndex]) {
      return true;
    }

    setSubmittingAnswer(true);

    try {
      const basicScore = calculateBasicScore(answer);
      const basicFeedback = generateBasicFeedback(answer);

      /*
       * POST /api/interviews/questions/{questionId}/answer
       */

      await api.post(
        `/interviews/questions/${currentQuestion.id}/answer`,
        {
          answerText: answer,
          score: basicScore,
          feedback: basicFeedback,
        }
      );

      const updatedSubmittedAnswers = [...submittedAnswers];

      updatedSubmittedAnswers[questionIndex] = true;

      setSubmittedAnswers(updatedSubmittedAnswers);

      toast.success("Answer submitted!");

      return true;
    } catch (error) {
      console.error("Failed to submit answer:", error);

      const message =
        error.response?.data?.message ||
        "Failed to submit answer.";

      toast.error(message);

      return false;
    } finally {
      setSubmittingAnswer(false);
    }
  };

  /*
   * -----------------------------------------
   * NEXT QUESTION
   * -----------------------------------------
   */

  const goToNext = async () => {
    const submitted = await submitCurrentAnswer();

    if (!submitted) {
      return;
    }

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  /*
   * -----------------------------------------
   * PREVIOUS QUESTION
   * -----------------------------------------
   */

  const goToPrevious = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  /*
   * -----------------------------------------
   * FINISH INTERVIEW
   * -----------------------------------------
   */

  const finishInterview = async () => {
    const submitted = await submitCurrentAnswer();

    if (!submitted) {
      return;
    }

    setLoading(true);

    try {
      /*
       * Evaluate interview in backend.
       *
       * POST /api/interviews/{id}/evaluate
       */

      const response = await api.post(
        `/interviews/${interviewId}/evaluate`
      );

      const result = response.data;

      setInterviewResult(result);
      setScore(result.score ?? 0);

      setQuestions(result.questions || questions);

      setScreen("results");

      toast.success("Interview completed!");
    } catch (error) {
      console.error("Failed to evaluate interview:", error);

      const message =
        error.response?.data?.message ||
        "Failed to evaluate interview.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  /*
   * -----------------------------------------
   * RESTART
   * -----------------------------------------
   */

  const restartInterview = () => {
    setScreen("setup");

    setInterviewId(null);
    setQuestions([]);
    setQuestionIndex(0);
    setAnswers([]);
    setSubmittedAnswers([]);
    setScore(0);
    setInterviewResult(null);
  };

  /*
   * -----------------------------------------
   * DASHBOARD
   * -----------------------------------------
   */

  const goDashboard = () => {
    window.location.href = "/dashboard";
  };

  /*
   * =========================================
   * SETUP SCREEN
   * =========================================
   */

  if (screen === "setup") {
    return (
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            AI Mock Interview
          </h1>

          <p className="mt-1 text-sm text-zinc-400">
            Practice realistic interview questions and improve your
            interview performance.
          </p>
        </div>

        <Card>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* LEFT */}

            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black">
                <Brain size={24} />
              </div>

              <h2 className="mt-5 text-3xl font-bold text-white">
                Practice Like It's a Real Interview
              </h2>

              <p className="mt-4 leading-7 text-zinc-400">
                Select your interview preferences and answer
                technical interview questions. Your interview,
                questions, answers and final score are stored in
                the backend.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                  <Target size={20} className="text-zinc-400" />

                  <p className="mt-3 text-xl font-bold text-white">
                    {questionCount}
                  </p>

                  <p className="text-xs text-zinc-500">
                    Questions
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                  <Clock3 size={20} className="text-zinc-400" />

                  <p className="mt-3 text-xl font-bold text-white">
                    15
                  </p>

                  <p className="text-xs text-zinc-500">
                    Minutes
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                  <Brain size={20} className="text-zinc-400" />

                  <p className="mt-3 text-xl font-bold text-white">
                    Basic
                  </p>

                  <p className="text-xs text-zinc-500">
                    Evaluation
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-white">
                Interview Setup
              </h3>

              <form
                onSubmit={startInterview}
                className="mt-5 space-y-5"
              >
                {/* ROLE */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Job Role
                  </label>

                  <select
                    value={role}
                    onChange={(event) =>
                      setRole(event.target.value)
                    }
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-zinc-400"
                  >
                    <option>Frontend Developer</option>
                    <option>Backend Developer</option>
                    <option>Full Stack Developer</option>
                    <option>Java Developer</option>
                    <option>React Developer</option>
                    <option>Software Engineer</option>
                  </select>
                </div>

                {/* DIFFICULTY */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Difficulty
                  </label>

                  <select
                    value={difficulty}
                    onChange={(event) =>
                      setDifficulty(event.target.value)
                    }
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-zinc-400"
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>

                {/* QUESTIONS */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Number of Questions
                  </label>

                  <select
                    value={questionCount}
                    onChange={(event) =>
                      setQuestionCount(
                        Number(event.target.value)
                      )
                    }
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-zinc-400"
                  >
                    <option value={3}>3 Questions</option>
                    <option value={5}>5 Questions</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={loading}
                >
                  {loading
                    ? "Starting Interview..."
                    : "Start Mock Interview"}
                </Button>
              </form>
            </div>
          </div>
        </Card>

        {/* HOW IT WORKS */}

        <div>
          <h2 className="text-xl font-semibold text-white">
            How It Works
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white font-bold text-black">
                1
              </div>

              <h3 className="mt-4 font-semibold text-white">
                Start Interview
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Select your role, difficulty and number of
                questions.
              </p>
            </Card>

            <Card>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white font-bold text-black">
                2
              </div>

              <h3 className="mt-4 font-semibold text-white">
                Answer Questions
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Answer technical questions just like a real
                interview.
              </p>
            </Card>

            <Card>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white font-bold text-black">
                3
              </div>

              <h3 className="mt-4 font-semibold text-white">
                Review Results
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Review your score and feedback from the backend.
              </p>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  /*
   * =========================================
   * INTERVIEW SCREEN
   * =========================================
   */

  if (screen === "interview") {
    if (!currentQuestion) {
      return (
        <div className="mx-auto max-w-4xl">
          <Card>
            <p className="text-center text-white">
              Loading interview questions...
            </p>
          </Card>
        </div>
      );
    }

    return (
      <div className="mx-auto max-w-4xl space-y-6">
        {/* HEADER */}

        <div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                AI Mock Interview
              </h1>

              <p className="mt-1 text-sm text-zinc-500">
                {role} • {difficulty}
              </p>
            </div>

            <Badge variant="default">
              Question {questionIndex + 1} of {questions.length}
            </Badge>
          </div>

          {/* PROGRESS */}

          <div className="mt-5">
            <div className="flex justify-between text-xs text-zinc-500">
              <span>Interview Progress</span>

              <span>{Math.round(progress)}%</span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-white transition-all duration-300"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* QUESTION */}

        <Card>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">{role}</Badge>

            <Badge variant="default">{difficulty}</Badge>
          </div>

          <h2 className="mt-6 text-xl font-semibold leading-8 text-white sm:text-2xl">
            {currentQuestion.questionText}
          </h2>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Your Answer
            </label>

            <textarea
              value={answers[questionIndex] || ""}
              onChange={updateAnswer}
              rows={10}
              disabled={submittedAnswers[questionIndex]}
              placeholder="Type your answer here..."
              className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-4 text-sm leading-7 text-white outline-none placeholder:text-zinc-600 focus:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-70"
            />

            <p className="mt-2 text-xs text-zinc-600">
              Try to explain your answer clearly and include
              examples when possible.
            </p>
          </div>

          {/* NAVIGATION */}

          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-zinc-800 pt-5 sm:flex-row sm:justify-between">
            <Button
              variant="outline"
              onClick={goToPrevious}
              disabled={questionIndex === 0 || submittingAnswer}
              icon={<ArrowLeft size={17} />}
            >
              Previous
            </Button>

            {questionIndex < questions.length - 1 ? (
              <Button
                variant="primary"
                onClick={goToNext}
                disabled={submittingAnswer}
                icon={<ArrowRight size={17} />}
              >
                {submittingAnswer
                  ? "Submitting..."
                  : "Next Question"}
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={finishInterview}
                disabled={submittingAnswer || loading}
              >
                {loading
                  ? "Evaluating..."
                  : "Finish Interview"}
              </Button>
            )}
          </div>
        </Card>

        {/* QUESTION NAVIGATION */}

        <Card>
          <h3 className="text-sm font-semibold text-white">
            Questions
          </h3>

          <div className="mt-4 flex flex-wrap gap-2">
            {questions.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setQuestionIndex(index)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition ${
                  questionIndex === index
                    ? "border-white bg-white text-black"
                    : answers[index]?.trim()
                    ? "border-zinc-600 bg-zinc-800 text-white"
                    : "border-zinc-800 bg-zinc-900 text-zinc-500 hover:border-zinc-600 hover:text-white"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  /*
   * =========================================
   * RESULTS SCREEN
   * =========================================
   */

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* HEADER */}

      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Interview Results
        </h1>

        <p className="mt-1 text-sm text-zinc-400">
          Here's your interview performance summary.
        </p>
      </div>

      {/* SCORE */}

      <Card>
        <div className="flex flex-col items-center py-8 text-center">
          <p className="text-sm text-zinc-500">
            Overall Score
          </p>

          <div className="mt-4 flex h-36 w-36 items-center justify-center rounded-full border-8 border-zinc-700">
            <div>
              <p className="text-4xl font-bold text-white">
                {score}
              </p>

              <p className="text-xs text-zinc-500">
                / 100
              </p>
            </div>
          </div>

          <h2 className="mt-5 text-2xl font-bold text-white">
            Interview Completed
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
            Your interview has been evaluated and saved in your
            account.
          </p>
        </div>
      </Card>

      {/* STATS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-zinc-800 p-3">
              <Target size={22} />
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Score
              </p>

              <p className="text-2xl font-bold text-white">
                {score}%
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-zinc-800 p-3">
              <CheckCircle2 size={22} />
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Questions
              </p>

              <p className="text-2xl font-bold text-white">
                {interviewResult?.totalQuestions ??
                  questions.length}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-zinc-800 p-3">
              <Clock3 size={22} />
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Status
              </p>

              <p className="text-xl font-bold text-white">
                {interviewResult?.status || "COMPLETED"}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* QUESTION RESULTS */}

      <Card>
        <h3 className="text-lg font-semibold text-white">
          Question Results
        </h3>

        <div className="mt-5 space-y-4">
          {(interviewResult?.questions || questions).map(
            (question, index) => (
              <div
                key={question.id || index}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs text-zinc-500">
                      Question {question.questionNumber || index + 1}
                    </p>

                    <p className="mt-2 font-medium leading-6 text-white">
                      {question.questionText}
                    </p>
                  </div>

                  <Badge variant="default">
                    {question.score ?? 0}/10
                  </Badge>
                </div>

                {question.answerText && (
                  <div className="mt-4">
                    <p className="text-xs font-medium text-zinc-500">
                      Your Answer
                    </p>

                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {question.answerText}
                    </p>
                  </div>
                )}

                {question.feedback && (
                  <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                    <p className="text-xs font-medium text-zinc-500">
                      Feedback
                    </p>

                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {question.feedback}
                    </p>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </Card>

      {/* ACTIONS */}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          variant="primary"
          onClick={restartInterview}
          icon={<RotateCcw size={17} />}
        >
          Try Again
        </Button>

        <Button
          variant="outline"
          onClick={goDashboard}
          icon={<LayoutDashboard size={17} />}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}

export default Interview;