package com.careerprepai.dto.connection;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class CreateConnectionRequest {

    @NotNull(message = "Receiver ID is required")
    @Positive(message = "Receiver ID must be positive")
    private Long receiverId;

    public CreateConnectionRequest() {}

    public Long getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Long receiverId) {
        this.receiverId = receiverId;
    }
}