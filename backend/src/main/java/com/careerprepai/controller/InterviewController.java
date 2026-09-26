package com.careerprepai.controller;
import com.careerprepai.dto.interview.CreateQuestionRequest;
import com.careerprepai.dto.interview.InterviewResponse;
import com.careerprepai.service.InterviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.careerprepai.dto.interview.SubmitAnswerRequest;

import java.util.List;

@RestController
@RequestMapping("/api/interviews")
public class InterviewController {

    private final InterviewService interviewService;

    public InterviewController(InterviewService interviewService) {
        this.interviewService = interviewService;
    }

    // Start a new interview
    @PostMapping("/start")
    public ResponseEntity<InterviewResponse> startInterview(
            Authentication authentication,
            @RequestParam String role,
            @RequestParam Integer totalQuestions) {

        String email = authentication.getName();

        InterviewResponse response =
                interviewService.startInterview(
                        email,
                        role,
                        totalQuestions
                );

        return ResponseEntity.ok(response);
    }

    // Evaluate interview
    @PostMapping("/{id}/evaluate")
    public ResponseEntity<InterviewResponse> evaluateInterview(
            Authentication authentication,
            @PathVariable Long id) {

        String email = authentication.getName();

        InterviewResponse response =
                interviewService.evaluateInterview(
                        email,
                        id
                );

        return ResponseEntity.ok(response);
    }

    // Get all interviews
    @GetMapping
    public ResponseEntity<List<InterviewResponse>> getMyInterviews(
            Authentication authentication) {

        String email = authentication.getName();

        List<InterviewResponse> responses =
                interviewService.getMyInterviews(email);

        return ResponseEntity.ok(responses);
    }

    // Get one interview
    @GetMapping("/{id}")
    public ResponseEntity<InterviewResponse> getMyInterview(
            Authentication authentication,
            @PathVariable Long id) {

        String email = authentication.getName();

        InterviewResponse response =
                interviewService.getMyInterview(
                        email,
                        id
                );

        return ResponseEntity.ok(response);
    }
    @PostMapping("/{id}/questions")
    public ResponseEntity<InterviewResponse> createQuestion(
            Authentication authentication,
            @PathVariable Long id,
            @RequestBody CreateQuestionRequest request) {

        String email = authentication.getName();

        InterviewResponse response =
                interviewService.createQuestion(
                        email,
                        id,
                        request.getQuestionNumber(),
                        request.getQuestionText()
                );

        return ResponseEntity.ok(response);
    }
    @PostMapping("/questions/{questionId}/answer")
    public ResponseEntity<InterviewResponse> submitAnswer(
            Authentication authentication,
            @PathVariable Long questionId,
            @RequestBody SubmitAnswerRequest request) {

        String email = authentication.getName();

        InterviewResponse response = interviewService.submitAnswer(
                email,
                questionId,
                request.getAnswerText(),
                request.getScore(),
                request.getFeedback()
        );

        return ResponseEntity.ok(response);
    }
}