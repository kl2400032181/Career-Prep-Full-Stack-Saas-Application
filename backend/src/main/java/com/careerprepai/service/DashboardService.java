package com.careerprepai.service;

import com.careerprepai.dto.dashboard.DashboardResponse;
import com.careerprepai.dto.resume.ResumeResponse;
import com.careerprepai.entity.Interview;
import com.careerprepai.entity.Resume;
import com.careerprepai.entity.User;
import com.careerprepai.repository.InterviewRepository;
import com.careerprepai.repository.ResumeRepository;
import com.careerprepai.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;
    private final InterviewRepository interviewRepository;

    public DashboardService(
            UserRepository userRepository,
            ResumeRepository resumeRepository,
            InterviewRepository interviewRepository) {

        this.userRepository = userRepository;
        this.resumeRepository = resumeRepository;
        this.interviewRepository = interviewRepository;
    }

    public DashboardResponse getDashboard(String email) {

        // Find logged-in user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ==========================================
        // RESUME DATA
        // ==========================================

        List<Resume> resumes =
                resumeRepository.findByUserIdOrderByUploadedAtDesc(
                        user.getId()
                );

        long resumeCount = resumes.size();

        ResumeResponse latestResume = null;

        if (!resumes.isEmpty()) {

            Resume resume = resumes.get(0);

            latestResume = new ResumeResponse(
                    resume.getId(),
                    resume.getOriginalFileName(),
                    resume.getFileSize(),
                    resume.getContentType(),
                    resume.getUploadedAt()
            );
        }

        // ==========================================
        // INTERVIEW DATA
        // ==========================================

        List<Interview> interviews =
                interviewRepository.findByUserIdOrderByStartedAtDesc(
                        user.getId()
                );

        long totalInterviews = 0;

        double averageInterviewScore = 0;

        int totalScore = 0;

        int scoredInterviews = 0;

        for (Interview interview : interviews) {

            // Count only completed interviews
            if ("COMPLETED".equalsIgnoreCase(interview.getStatus())) {

                totalInterviews++;

                if (interview.getScore() != null) {

                    totalScore += interview.getScore();

                    scoredInterviews++;
                }
            }
        }

        // Calculate average score
        if (scoredInterviews > 0) {

            averageInterviewScore =
                    (double) totalScore / scoredInterviews;

            // Keep dashboard value clean
            averageInterviewScore =
                    Math.round(averageInterviewScore * 100.0) / 100.0;
        }

        // ==========================================
        // FINAL DASHBOARD RESPONSE
        // ==========================================

        return new DashboardResponse(
                user.getName(),
                user.getEmail(),
                resumeCount,
                latestResume,
                totalInterviews,
                averageInterviewScore
        );
    }
}