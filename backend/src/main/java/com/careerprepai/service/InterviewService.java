package com.careerprepai.service;

import com.careerprepai.dto.interview.InterviewResponse;
import com.careerprepai.entity.Interview;
import com.careerprepai.entity.InterviewAnswer;
import com.careerprepai.entity.InterviewQuestion;
import com.careerprepai.entity.User;
import com.careerprepai.repository.InterviewAnswerRepository;
import com.careerprepai.repository.InterviewQuestionRepository;
import com.careerprepai.repository.InterviewRepository;
import com.careerprepai.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class InterviewService {

    private final InterviewRepository interviewRepository;
    private final InterviewQuestionRepository questionRepository;
    private final InterviewAnswerRepository answerRepository;
    private final UserRepository userRepository;

    public InterviewService(
            InterviewRepository interviewRepository,
            InterviewQuestionRepository questionRepository,
            InterviewAnswerRepository answerRepository,
            UserRepository userRepository) {

        this.interviewRepository = interviewRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.userRepository = userRepository;
    }

    // Start a new interview
    public InterviewResponse startInterview(
            String email,
            String role,
            Integer totalQuestions) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Interview interview = new Interview();

        interview.setUser(user);
        interview.setRole(role);
        interview.setTotalQuestions(totalQuestions);
        interview.setScore(0);
        interview.setStatus("STARTED");

        Interview savedInterview = interviewRepository.save(interview);

        return convertToResponse(savedInterview);
    }

    // Get all interviews of logged-in user
    public List<InterviewResponse> getMyInterviews(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Interview> interviews =
                interviewRepository.findByUserIdOrderByStartedAtDesc(
                        user.getId()
                );

        List<InterviewResponse> responses = new ArrayList<>();

        for (Interview interview : interviews) {
            responses.add(convertToResponse(interview));
        }

        return responses;
    }

    // Get one interview
    public InterviewResponse getMyInterview(
            String email,
            Long interviewId) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Interview interview =
                interviewRepository.findByIdAndUserId(
                        interviewId,
                        user.getId()
                )
                .orElseThrow(() ->
                        new RuntimeException("Interview not found"));

        return convertToResponse(interview);
    }

    // Evaluate interview
    public InterviewResponse evaluateInterview(
            String email,
            Long interviewId) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Interview interview =
                interviewRepository.findByIdAndUserId(
                        interviewId,
                        user.getId()
                )
                .orElseThrow(() ->
                        new RuntimeException("Interview not found"));

        List<InterviewQuestion> questions =
                questionRepository
                        .findByInterviewIdOrderByQuestionNumberAsc(
                                interviewId
                        );

        int totalScore = 0;
        int answeredQuestions = 0;

        for (InterviewQuestion question : questions) {

            List<InterviewAnswer> answers =
                    answerRepository.findByQuestionId(
                            question.getId()
                    );

            if (!answers.isEmpty()) {

                InterviewAnswer answer = answers.get(0);

                if (answer.getScore() != null) {
                    totalScore += answer.getScore();
                    answeredQuestions++;
                }
            }
        }

        int finalScore = 0;

        if (answeredQuestions > 0) {
            finalScore = totalScore / answeredQuestions;
        }

        interview.setScore(finalScore);
        interview.setStatus("COMPLETED");
        interview.setCompletedAt(LocalDateTime.now());

        Interview savedInterview =
                interviewRepository.save(interview);

        return convertToResponse(savedInterview);
    }

    // Convert entity to DTO
    private InterviewResponse convertToResponse(
            Interview interview) {

        List<InterviewQuestion> questions =
                questionRepository
                        .findByInterviewIdOrderByQuestionNumberAsc(
                                interview.getId()
                        );

        List<InterviewResponse.QuestionResponse> questionResponses =
                new ArrayList<>();

        for (InterviewQuestion question : questions) {

            String answerText = null;
            Integer score = null;
            String feedback = null;

            List<InterviewAnswer> answers =
                    answerRepository.findByQuestionId(
                            question.getId()
                    );

            if (!answers.isEmpty()) {

                InterviewAnswer answer = answers.get(0);

                answerText = answer.getAnswerText();
                score = answer.getScore();
                feedback = answer.getFeedback();
            }

            InterviewResponse.QuestionResponse questionResponse =
                    new InterviewResponse.QuestionResponse(
                            question.getId(),
                            question.getQuestionNumber(),
                            question.getQuestionText(),
                            answerText,
                            score,
                            feedback
                    );

            questionResponses.add(questionResponse);
        }
        

        return new InterviewResponse(
                interview.getId(),
                interview.getRole(),
                interview.getTotalQuestions(),
                interview.getScore(),
                interview.getStatus(),
                interview.getStartedAt(),
                interview.getCompletedAt(),
                questionResponses
        );
    }
    public InterviewResponse createQuestion(
            String email,
            Long interviewId,
            Integer questionNumber,
            String questionText) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Interview interview = interviewRepository
                .findByIdAndUserId(interviewId, user.getId())
                .orElseThrow(() ->
                        new RuntimeException("Interview not found"));

        InterviewQuestion question = new InterviewQuestion();

        question.setInterview(interview);
        question.setQuestionNumber(questionNumber);
        question.setQuestionText(questionText);

        questionRepository.save(question);

        return convertToResponse(interview);
    }
    public InterviewResponse submitAnswer(
            String email,
            Long questionId,
            String answerText,
            Integer score,
            String feedback) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        InterviewQuestion question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        // Make sure this question belongs to the logged-in user's interview
        if (!question.getInterview().getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not allowed to answer this question");
        }

        InterviewAnswer answer = new InterviewAnswer();

        answer.setQuestion(question);
        answer.setAnswerText(answerText);
        answer.setScore(score);
        answer.setFeedback(feedback);

        answerRepository.save(answer);

        return convertToResponse(question.getInterview());
    }
}