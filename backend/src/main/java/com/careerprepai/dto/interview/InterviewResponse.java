package com.careerprepai.dto.interview;

import java.time.LocalDateTime;
import java.util.List;

public class InterviewResponse {

    private Long id;

    private String role;

    private Integer totalQuestions;

    private Integer score;

    private String status;

    private LocalDateTime startedAt;

    private LocalDateTime completedAt;

    private List<QuestionResponse> questions;

    public InterviewResponse() {
    }

    public InterviewResponse(
            Long id,
            String role,
            Integer totalQuestions,
            Integer score,
            String status,
            LocalDateTime startedAt,
            LocalDateTime completedAt,
            List<QuestionResponse> questions) {

        this.id = id;
        this.role = role;
        this.totalQuestions = totalQuestions;
        this.score = score;
        this.status = status;
        this.startedAt = startedAt;
        this.completedAt = completedAt;
        this.questions = questions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Integer getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(Integer totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }

    public List<QuestionResponse> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionResponse> questions) {
        this.questions = questions;
    }

    public static class QuestionResponse {

        private Long id;

        private Integer questionNumber;

        private String questionText;

        private String answerText;

        private Integer score;

        private String feedback;

        public QuestionResponse() {
        }

        public QuestionResponse(
                Long id,
                Integer questionNumber,
                String questionText,
                String answerText,
                Integer score,
                String feedback) {

            this.id = id;
            this.questionNumber = questionNumber;
            this.questionText = questionText;
            this.answerText = answerText;
            this.score = score;
            this.feedback = feedback;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public Integer getQuestionNumber() {
            return questionNumber;
        }

        public void setQuestionNumber(Integer questionNumber) {
            this.questionNumber = questionNumber;
        }

        public String getQuestionText() {
            return questionText;
        }

        public void setQuestionText(String questionText) {
            this.questionText = questionText;
        }

        public String getAnswerText() {
            return answerText;
        }

        public void setAnswerText(String answerText) {
            this.answerText = answerText;
        }

        public Integer getScore() {
            return score;
        }

        public void setScore(Integer score) {
            this.score = score;
        }

        public String getFeedback() {
            return feedback;
        }

        public void setFeedback(String feedback) {
            this.feedback = feedback;
        }
    }
}