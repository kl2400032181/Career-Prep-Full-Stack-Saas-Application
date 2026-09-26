package com.careerprepai.repository;

import com.careerprepai.entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InterviewRepository extends JpaRepository<Interview, Long> {

    List<Interview> findByUserIdOrderByStartedAtDesc(Long userId);

    Optional<Interview> findByIdAndUserId(Long id, Long userId);
}