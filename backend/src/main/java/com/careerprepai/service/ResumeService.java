package com.careerprepai.service;
import com.careerprepai.dto.resume.ResumeResponse;


import java.util.List;

import com.careerprepai.dto.resume.ResumeUploadResponse;
import com.careerprepai.entity.Resume;
import com.careerprepai.entity.User;
import com.careerprepai.repository.ResumeRepository;
import com.careerprepai.repository.UserRepository;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.pdmodel.PDDocument;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    @Value("${resume.upload-dir}")
    private String uploadDir;

    public ResumeService(
            ResumeRepository resumeRepository,
            UserRepository userRepository) {

        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
    }

    public ResumeUploadResponse uploadResume(
            String email,
            MultipartFile file) throws IOException {

        // 1. Check if file exists
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Resume file is required");
        }

        // 2. Check file size
        if (file.getSize() > 5 * 1024 * 1024) {
            throw new RuntimeException(
                    "Resume file must be 5 MB or smaller");
        }

        // 3. Check content type
        if (!"application/pdf".equalsIgnoreCase(
                file.getContentType())) {

            throw new RuntimeException(
                    "Only PDF files are allowed");
        }

        // 4. Find logged-in user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // 5. Create upload directory
        Path uploadPath = Paths.get(uploadDir)
                .toAbsolutePath()
                .normalize();

        Files.createDirectories(uploadPath);

        // 6. Generate safe unique filename
        String storedFileName =
                UUID.randomUUID() + ".pdf";

        Path targetPath =
                uploadPath.resolve(storedFileName)
                          .normalize();

        // 7. Save the PDF
        Files.copy(file.getInputStream(), targetPath);

        // 8. Extract text from PDF
        String extractedText =
                extractText(targetPath);

        // 9. Create Resume entity
        Resume resume = new Resume();

        resume.setUser(user);
        resume.setOriginalFileName(file.getOriginalFilename());
        resume.setStoredFileName(storedFileName);
        resume.setFilePath(targetPath.toString());
        resume.setContentType(file.getContentType());
        resume.setFileSize(file.getSize());
        resume.setExtractedText(extractedText);

        // 10. Save database record
        Resume savedResume =
                resumeRepository.save(resume);

        // 11. Return safe response
        return new ResumeUploadResponse(
                savedResume.getId(),
                savedResume.getOriginalFileName(),
                savedResume.getFileSize(),
                savedResume.getContentType(),
                "Resume uploaded successfully"
        );
    }
    public List<ResumeResponse> getMyResumes(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return resumeRepository
                .findByUserIdOrderByUploadedAtDesc(user.getId())
                .stream()
                .map(resume -> new ResumeResponse(
                        resume.getId(),
                        resume.getOriginalFileName(),
                        resume.getFileSize(),
                        resume.getContentType(),
                        resume.getUploadedAt()
                ))
                .toList();
    }
    public ResumeResponse getMyResume(String email, Long resumeId) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Resume resume = resumeRepository
                .findByIdAndUserId(resumeId, user.getId())
                .orElseThrow(() ->
                        new RuntimeException("Resume not found"));

        return new ResumeResponse(
                resume.getId(),
                resume.getOriginalFileName(),
                resume.getFileSize(),
                resume.getContentType(),
                resume.getUploadedAt()
        );
    }

    private String extractText(Path pdfPath)
            throws IOException {

        try (PDDocument document =
                     Loader.loadPDF(pdfPath.toFile())) {

            PDFTextStripper stripper =
                    new PDFTextStripper();

            return stripper.getText(document);
        }
    }
}