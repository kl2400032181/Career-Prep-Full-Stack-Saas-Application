package com.careerprepai.dto.dashboard;

import com.careerprepai.dto.resume.ResumeResponse;

public class DashboardResponse {

    private String name;

    private String email;

    private long resumeCount;

    private ResumeResponse latestResume;

    private long totalInterviews;

    private double averageInterviewScore;

    public DashboardResponse() {
    }

    public DashboardResponse(
            String name,
            String email,
            long resumeCount,
            ResumeResponse latestResume,
            long totalInterviews,
            double averageInterviewScore) {

        this.name = name;
        this.email = email;
        this.resumeCount = resumeCount;
        this.latestResume = latestResume;
        this.totalInterviews = totalInterviews;
        this.averageInterviewScore = averageInterviewScore;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getResumeCount() {
        return resumeCount;
    }

    public void setResumeCount(long resumeCount) {
        this.resumeCount = resumeCount;
    }

    public ResumeResponse getLatestResume() {
        return latestResume;
    }

    public void setLatestResume(ResumeResponse latestResume) {
        this.latestResume = latestResume;
    }

    public long getTotalInterviews() {
        return totalInterviews;
    }

    public void setTotalInterviews(long totalInterviews) {
        this.totalInterviews = totalInterviews;
    }

    public double getAverageInterviewScore() {
        return averageInterviewScore;
    }

    public void setAverageInterviewScore(double averageInterviewScore) {
        this.averageInterviewScore = averageInterviewScore;
    }
}