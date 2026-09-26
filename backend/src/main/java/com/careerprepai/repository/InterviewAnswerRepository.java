package com.careerprepai.repository;

import com.careerprepai.entity.InterviewAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InterviewAnswerRepository
        extends JpaRepository<InterviewAnswer, Long> {

    List<InterviewAnswer> findByQuestionId(Long questionId);

    Optional<InterviewAnswer> findByIdAndQuestionId(
            Long id,
            Long questionId
    );
}