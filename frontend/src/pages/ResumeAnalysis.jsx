import { useEffect, useRef, useState } from "react";
import {
  Upload,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Target,
  TrendingUp,
  RotateCcw,
} from "lucide-react";
import toast from "react-hot-toast";

import Card from "../Components/common/Card";
import Button from "../Components/common/Button";
import Badge from "../Components/common/Badge";
import api from "../services/api";

function ResumeAnalysis() {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Real resumes from backend
  const [resumes, setResumes] = useState([]);
  const [loadingResumes, setLoadingResumes] = useState(true);

  // Temporary analysis data
  // We will replace this with real AI analysis later.
  const [analysis, setAnalysis] = useState({
    atsScore: 84,
    resumeScore: 82,
    skillsMatched: 78,
    strengths: [
      "Clear professional summary",
      "Good technical skill coverage",
      "Projects demonstrate practical experience",
      "Resume has a clean structure",
    ],
    skillGaps: [
      "System Design",
      "AWS",
      "Docker",
      "Testing",
    ],
    recommendations: [
      "Add measurable achievements to your experience section.",
      "Include more keywords related to your target job role.",
      "Add system design and cloud-related skills.",
      "Use stronger action verbs when describing projects.",
    ],
  });

  // --------------------------------------------------
  // LOAD RESUMES FROM BACKEND
  // --------------------------------------------------

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await api.get("/resumes");

        setResumes(response.data || []);
      } catch (error) {
        console.error("Failed to load resumes:", error);

        toast.error("Failed to load resumes.");
      } finally {
        setLoadingResumes(false);
      }
    };

    fetchResumes();
  }, []);

  // --------------------------------------------------
  // FILE VALIDATION
  // --------------------------------------------------

  const validateFile = (file) => {
    if (!file) {
      return false;
    }

    const isPDF =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPDF) {
      toast.error("Please upload a PDF resume.");
      return false;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error("Resume must be smaller than 5 MB.");
      return false;
    }

    return true;
  };

  // --------------------------------------------------
  // HANDLE FILE
  // --------------------------------------------------

  const handleFile = (file) => {
    if (!validateFile(file)) {
      return;
    }

    setSelectedFile(file);
    setAnalysisComplete(false);

    toast.success("Resume selected successfully.");
  };

  // --------------------------------------------------
  // FILE INPUT
  // --------------------------------------------------

  const handleFileInput = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      handleFile(file);
    }

    event.target.value = "";
  };

  // --------------------------------------------------
  // DRAG & DROP
  // --------------------------------------------------

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  // --------------------------------------------------
  // REMOVE SELECTED FILE
  // --------------------------------------------------

  const removeFile = () => {
    setSelectedFile(null);
    setAnalysisComplete(false);
    setIsAnalyzing(false);
  };

  // --------------------------------------------------
  // UPLOAD RESUME TO BACKEND
  // --------------------------------------------------

  const analyzeResume = async () => {
    if (!selectedFile) {
      toast.error("Please upload your resume first.");
      return;
    }

    setIsAnalyzing(true);

    try {
      const formData = new FormData();

      formData.append("file", selectedFile);

      const response = await api.post(
        "/resumes/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Resume uploaded:", response.data);

      // Add uploaded resume to frontend list
      setResumes((previous) => [
        response.data,
        ...previous,
      ]);

      setIsAnalyzing(false);
      setAnalysisComplete(true);

      toast.success("Resume uploaded successfully!");
    } catch (error) {
      console.error("Resume upload failed:", error);

      const message =
        error.response?.data?.message ||
        "Resume upload failed. Please try again.";

      toast.error(message);

      setIsAnalyzing(false);
    }
  };

  // --------------------------------------------------
  // RESET ANALYSIS
  // --------------------------------------------------

  const resetAnalysis = () => {
    setSelectedFile(null);
    setAnalysisComplete(false);
    setIsAnalyzing(false);
  };

  // --------------------------------------------------
  // FORMAT FILE SIZE
  // --------------------------------------------------

  const formatFileSize = (bytes) => {
    if (!bytes) {
      return "0 KB";
    }

    const sizeInKB = bytes / 1024;

    if (sizeInKB < 1024) {
      return `${sizeInKB.toFixed(1)} KB`;
    }

    return `${(sizeInKB / 1024).toFixed(1)} MB`;
  };

  // --------------------------------------------------
  // SCORE LABEL
  // --------------------------------------------------

  const scoreLabel = (score) => {
    if (score >= 85) {
      return "Excellent";
    }

    if (score >= 75) {
      return "Good";
    }

    if (score >= 60) {
      return "Needs Improvement";
    }

    return "Needs Attention";
  };

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}

      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Resume Analysis
        </h1>

        <p className="mt-1 text-sm text-zinc-400">
          Upload your resume and discover how to improve it for
          better job opportunities.
        </p>
      </div>

      {/* UPLOAD SECTION */}

      {!analysisComplete && (
        <Card>

          <div className="mb-5">
            <h2 className="text-lg font-semibold text-white">
              Upload Your Resume
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Upload a PDF file to analyze your resume.
            </p>
          </div>

          {!selectedFile ? (
            <>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className={`flex min-h-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition ${
                  isDragging
                    ? "border-white bg-zinc-800"
                    : "border-zinc-700 bg-zinc-900 hover:border-zinc-500 hover:bg-zinc-800"
                }`}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-800">
                  <Upload
                    size={28}
                    className="text-zinc-300"
                  />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-white">
                  Drop your resume here
                </h3>

                <p className="mt-2 text-sm text-zinc-500">
                  or click to browse from your computer
                </p>

                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Badge variant="default">
                    PDF only
                  </Badge>

                  <Badge variant="default">
                    Maximum 5 MB
                  </Badge>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-zinc-600">
                <AlertCircle size={14} />

                Your resume will be uploaded securely to your
                Career Prep AI account.
              </div>
            </>
          ) : (
            <>
              {/* SELECTED FILE */}

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex min-w-0 items-center gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-800">
                      <FileText
                        size={22}
                        className="text-zinc-300"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">
                        {selectedFile.name}
                      </p>

                      <p className="mt-1 text-sm text-zinc-500">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={removeFile}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
                    aria-label="Remove resume"
                  >
                    <X size={18} />
                  </button>

                </div>
              </div>

              {/* UPLOAD */}

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">

                <Button
                  variant="outline"
                  onClick={removeFile}
                  disabled={isAnalyzing}
                >
                  Choose Another
                </Button>

                <Button
                  variant="primary"
                  onClick={analyzeResume}
                  loading={isAnalyzing}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing
                    ? "Uploading Resume..."
                    : "Upload Resume"}
                </Button>

              </div>
            </>
          )}
        </Card>
      )}

      {/* RESUME HISTORY */}

      {!analysisComplete && (
        <Card>

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-lg font-semibold text-white">
                My Resumes
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Resumes uploaded to your account.
              </p>
            </div>

            <Badge variant="default">
              {resumes.length}
            </Badge>

          </div>

          <div className="mt-5 space-y-3">

            {loadingResumes ? (
              <p className="text-sm text-zinc-500">
                Loading resumes...
              </p>
            ) : resumes.length === 0 ? (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-center">
                <FileText
                  size={28}
                  className="mx-auto text-zinc-600"
                />

                <p className="mt-3 text-sm text-zinc-500">
                  No resumes uploaded yet.
                </p>
              </div>
            ) : (
              resumes.map((resume, index) => (
                <div
                  key={
                    resume.id ??
                    resume.resumeId ??
                    index
                  }
                  className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4"
                >

                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
                      <FileText size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {resume.fileName ||
                          resume.originalFileName ||
                          resume.name ||
                          "Resume"}
                      </p>

                      <p className="mt-1 text-xs text-zinc-600">
                        {resume.createdAt
                          ? new Date(
                              resume.createdAt
                            ).toLocaleString()
                          : "Uploaded resume"}
                      </p>
                    </div>

                  </div>

                  <Badge variant="default">
                    PDF
                  </Badge>

                </div>
              ))
            )}

          </div>

        </Card>
      )}

      {/* ANALYSIS RESULTS */}

      {analysisComplete && (
        <>
          {/* RESULT HEADER */}

          <Card>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex min-w-0 items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-800">
                  <FileText size={22} />
                </div>

                <div className="min-w-0">

                  <p className="truncate font-semibold text-white">
                    {selectedFile?.name}
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    Resume uploaded successfully
                  </p>

                </div>

              </div>

              <Button
                variant="outline"
                onClick={resetAnalysis}
                icon={<RotateCcw size={16} />}
              >
                Analyze Another
              </Button>

            </div>
          </Card>

          {/* SCORE CARDS */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <Card>
              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-800">
                  <Target size={21} />
                </div>

                <div>
                  <p className="text-sm text-zinc-500">
                    ATS Score
                  </p>

                  <p className="text-2xl font-bold text-white">
                    {analysis.atsScore}%
                  </p>
                </div>

              </div>

              <p className="mt-3 text-xs text-zinc-600">
                {scoreLabel(analysis.atsScore)}
              </p>
            </Card>

            <Card>
              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-800">
                  <TrendingUp size={21} />
                </div>

                <div>
                  <p className="text-sm text-zinc-500">
                    Resume Score
                  </p>

                  <p className="text-2xl font-bold text-white">
                    {analysis.resumeScore}%
                  </p>
                </div>

              </div>

              <p className="mt-3 text-xs text-zinc-600">
                {scoreLabel(analysis.resumeScore)}
              </p>
            </Card>

            <Card>
              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-800">
                  <CheckCircle2 size={21} />
                </div>

                <div>
                  <p className="text-sm text-zinc-500">
                    Skills Matched
                  </p>

                  <p className="text-2xl font-bold text-white">
                    {analysis.skillsMatched}%
                  </p>
                </div>

              </div>

              <p className="mt-3 text-xs text-zinc-600">
                Target role compatibility
              </p>
            </Card>

            <Card>
              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-800">
                  <Lightbulb size={21} />
                </div>

                <div>
                  <p className="text-sm text-zinc-500">
                    Suggestions
                  </p>

                  <p className="text-2xl font-bold text-white">
                    {analysis.recommendations.length}
                  </p>
                </div>

              </div>

              <p className="mt-3 text-xs text-zinc-600">
                Improvement recommendations
              </p>
            </Card>

          </div>

          {/* ATS SCORE */}

          <Card>

            <div className="flex flex-col gap-6 md:flex-row md:items-center">

              <div className="flex shrink-0 items-center justify-center">

                <div className="flex h-40 w-40 items-center justify-center rounded-full border-[10px] border-zinc-700">

                  <div className="text-center">

                    <p className="text-4xl font-bold text-white">
                      {analysis.atsScore}
                    </p>

                    <p className="text-xs text-zinc-500">
                      ATS Score
                    </p>

                  </div>

                </div>

              </div>

              <div className="flex-1">

                <h2 className="text-xl font-semibold text-white">
                  Resume upload completed
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
                  Your resume has been uploaded successfully.
                  AI-powered resume analysis will be connected
                  in the next phase.
                </p>

                <div className="mt-5">

                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>
                      Current Demo Score
                    </span>

                    <span>
                      {analysis.atsScore}%
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">

                    <div
                      className="h-full rounded-full bg-white"
                      style={{
                        width: `${analysis.atsScore}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>

          </Card>

          {/* STRENGTHS + SKILL GAPS */}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* Strengths */}

            <Card>

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">
                  <CheckCircle2 size={20} />
                </div>

                <div>

                  <h2 className="font-semibold text-white">
                    Resume Strengths
                  </h2>

                  <p className="text-xs text-zinc-600">
                    Demo suggestions
                  </p>

                </div>

              </div>

              <div className="mt-5 space-y-3">

                {analysis.strengths.map((strength) => (
                  <div
                    key={strength}
                    className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4"
                  >

                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-zinc-400"
                    />

                    <p className="text-sm leading-6 text-zinc-400">
                      {strength}
                    </p>

                  </div>
                ))}

              </div>

            </Card>

            {/* Skill Gaps */}

            <Card>

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">
                  <Target size={20} />
                </div>

                <div>

                  <h2 className="font-semibold text-white">
                    Skill Gaps
                  </h2>

                  <p className="text-xs text-zinc-600">
                    Demo suggestions
                  </p>

                </div>

              </div>

              <div className="mt-5 space-y-3">

                {analysis.skillGaps.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4"
                  >

                    <span className="text-sm text-zinc-300">
                      {skill}
                    </span>

                    <Badge variant="default">
                      Recommended
                    </Badge>

                  </div>
                ))}

              </div>

            </Card>

          </div>

          {/* RECOMMENDATIONS */}

          <Card>

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">
                <Lightbulb size={20} />
              </div>

              <div>

                <h2 className="font-semibold text-white">
                  Recommendations
                </h2>

                <p className="text-xs text-zinc-600">
                  Demo suggestions for now
                </p>

              </div>

            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">

              {analysis.recommendations.map(
                (recommendation, index) => (
                  <div
                    key={recommendation}
                    className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4"
                  >

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-sm font-semibold text-white">
                      {index + 1}
                    </div>

                    <p className="text-sm leading-6 text-zinc-400">
                      {recommendation}
                    </p>

                  </div>
                )
              )}

            </div>

          </Card>

          {/* SUMMARY */}

          <Card>

            <h2 className="text-lg font-semibold text-white">
              Analysis Summary
            </h2>

            <p className="mt-4 leading-7 text-zinc-400">
              Your resume has been successfully uploaded and
              stored in your Career Prep AI account. The current
              analysis values are temporary demo data. Gemini AI
              analysis, ATS scoring, skill-gap detection and
              personalized recommendations will be connected
              in the AI phase.
            </p>

          </Card>
        </>
      )}

    </div>
  );
}

export default ResumeAnalysis;