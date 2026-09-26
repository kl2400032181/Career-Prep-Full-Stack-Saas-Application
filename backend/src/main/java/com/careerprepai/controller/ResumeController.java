package com.careerprepai.controller;
import com.careerprepai.dto.resume.ResumeResponse;
import java.util.List;

import com.careerprepai.dto.resume.ResumeUploadResponse;
import com.careerprepai.service.ResumeService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("/upload")
    public ResponseEntity<ResumeUploadResponse> uploadResume(
            Authentication authentication,
            @RequestParam("file") MultipartFile file)
            throws Exception {

        String email = authentication.getName();

        ResumeUploadResponse response =
                resumeService.uploadResume(email, file);

        return ResponseEntity.ok(response);
    }
    
    
    @GetMapping
    public ResponseEntity<List<ResumeResponse>> getMyResumes(
            Authentication authentication) {

        String email = authentication.getName();

        List<ResumeResponse> resumes =
                resumeService.getMyResumes(email);

        return ResponseEntity.ok(resumes);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ResumeResponse> getMyResume(
            Authentication authentication,
            @PathVariable Long id) {

        String email = authentication.getName();

        ResumeResponse resume =
                resumeService.getMyResume(email, id);

        return ResponseEntity.ok(resume);
    }
    
}