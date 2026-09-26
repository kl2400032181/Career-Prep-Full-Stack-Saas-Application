package com.careerprepai.dto.resume;

import java.time.LocalDateTime;

public class ResumeResponse {

    private Long id;
    private String originalFileName;
    private Long fileSize;
    private String contentType;
    private LocalDateTime uploadedAt;

    public ResumeResponse() {
    }

    public ResumeResponse(
            Long id,
            String originalFileName,
            Long fileSize,
            String contentType,
            LocalDateTime uploadedAt) {

        this.id = id;
        this.originalFileName = originalFileName;
        this.fileSize = fileSize;
        this.contentType = contentType;
        this.uploadedAt = uploadedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOriginalFileName() {
        return originalFileName;
    }

    public void setOriginalFileName(String originalFileName) {
        this.originalFileName = originalFileName;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }
}