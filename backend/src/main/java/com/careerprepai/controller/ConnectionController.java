package com.careerprepai.controller;

import com.careerprepai.dto.connection.ConnectionResponse;
import com.careerprepai.dto.connection.CreateConnectionRequest;
import com.careerprepai.service.ConnectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/connections")
public class ConnectionController {

    private final ConnectionService connectionService;

    public ConnectionController(ConnectionService connectionService) {
        this.connectionService = connectionService;
    }

    @PostMapping
    public ResponseEntity<ConnectionResponse> sendConnection(
            Authentication authentication,
            @RequestBody @Valid CreateConnectionRequest request) {

        String email = authentication.getName();

        ConnectionResponse response = connectionService.sendConnection(
                email,
                request.getReceiverId()
        );

        return ResponseEntity.ok(response);
    }
    @GetMapping
    public ResponseEntity<List<ConnectionResponse>> getMyConnections(
            Authentication authentication) {

        String email = authentication.getName();

        List<ConnectionResponse> responses =
                connectionService.getMyConnections(email);

        return ResponseEntity.ok(responses);
    }
    @PutMapping("/{connectionId}/status")
    public ResponseEntity<ConnectionResponse> updateConnectionStatus(
            Authentication authentication,
            @PathVariable Long connectionId,
            @RequestParam String status) {

        String email = authentication.getName();

        ConnectionResponse response =
                connectionService.updateConnectionStatus(
                        email,
                        connectionId,
                        status
                );

        return ResponseEntity.ok(response);
    }
}