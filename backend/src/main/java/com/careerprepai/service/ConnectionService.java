package com.careerprepai.service;

import com.careerprepai.dto.connection.ConnectionResponse;
import com.careerprepai.entity.Connection;
import com.careerprepai.entity.User;
import com.careerprepai.repository.ConnectionRepository;
import com.careerprepai.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConnectionService {

    private final ConnectionRepository connectionRepository;
    private final UserRepository userRepository;

    public ConnectionService(
            ConnectionRepository connectionRepository,
            UserRepository userRepository) {

        this.connectionRepository = connectionRepository;
        this.userRepository = userRepository;
    }

    public ConnectionResponse sendConnection(
            String email,
            Long receiverId) {

        User sender = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        if (sender.getId().equals(receiver.getId())) {
            throw new RuntimeException("You cannot connect with yourself");
        }

        Connection connection = new Connection();

        connection.setSender(sender);
        connection.setReceiver(receiver);
        connection.setStatus("PENDING");

        Connection savedConnection = connectionRepository.save(connection);

        return convertToResponse(savedConnection);
    }

    public List<ConnectionResponse> getMyConnections(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return connectionRepository
                .findBySenderIdOrReceiverIdOrderByCreatedAtDesc(
                        user.getId(),
                        user.getId()
                )
                .stream()
                .map(this::convertToResponse)
                .toList();
    }
    
    public ConnectionResponse updateConnectionStatus(
            String email,
            Long connectionId,
            String status) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Connection connection = connectionRepository.findById(connectionId)
                .orElseThrow(() -> new RuntimeException("Connection not found"));

        // Only the receiver can accept or reject the request
        if (!connection.getReceiver().getId().equals(user.getId())) {
            throw new RuntimeException(
                    "Only the receiver can update the connection request");
        }

        if (!status.equals("ACCEPTED") && !status.equals("REJECTED")) {
            throw new RuntimeException(
                    "Status must be ACCEPTED or REJECTED");
        }

        connection.setStatus(status);

        Connection updatedConnection =
                connectionRepository.save(connection);

        return convertToResponse(updatedConnection);
    }

    private ConnectionResponse convertToResponse(Connection connection) {

        return new ConnectionResponse(
                connection.getId(),
                connection.getSender().getId(),
                connection.getSender().getName(),
                connection.getReceiver().getId(),
                connection.getReceiver().getName(),
                connection.getStatus(),
                connection.getCreatedAt()
        );
    }
}