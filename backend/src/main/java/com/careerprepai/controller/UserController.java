package com.careerprepai.controller;

import com.careerprepai.dto.user.UpdateProfileRequest;
import com.careerprepai.dto.user.UserProfileResponse;
import com.careerprepai.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getMyProfile(
            Authentication authentication) {

        String email = authentication.getName();

        UserProfileResponse response =
                userService.getMyProfile(email);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/me")
    public ResponseEntity<UserProfileResponse> updateMyProfile(
            Authentication authentication,
            @RequestBody UpdateProfileRequest request) {

        String email = authentication.getName();

        UserProfileResponse response =
                userService.updateMyProfile(email, request);

        return ResponseEntity.ok(response);
    }
}
