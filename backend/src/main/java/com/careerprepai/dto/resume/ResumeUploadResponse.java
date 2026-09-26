package com.careerprepai.dto.resume;

public class ResumeUploadResponse {

    private Long id;
    private String originalFileName;
    private Long fileSize;
    private String contentType;
    private String message;

    public ResumeUploadResponse() {
    }

    public ResumeUploadResponse(
            Long id,
            String originalFileName,
            Long fileSize,
            String contentType,
            String message) {

        this.id = id;
        this.originalFileName = originalFileName;
        this.fileSize = fileSize;
        this.contentType = contentType;
        this.message = message;
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

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}