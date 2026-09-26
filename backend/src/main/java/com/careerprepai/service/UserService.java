package com.careerprepai.service;

import com.careerprepai.dto.user.UpdateProfileRequest;
import com.careerprepai.dto.user.UserProfileResponse;
import com.careerprepai.entity.Profile;
import com.careerprepai.entity.User;
import com.careerprepai.repository.ProfileRepository;
import com.careerprepai.repository.UserRepository;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;

    public UserService(UserRepository userRepository,
                       ProfileRepository profileRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }

    public UserProfileResponse getMyProfile(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Profile profile = profileRepository.findByUserId(user.getId())
                .orElse(null);

        return mapToResponse(user, profile);
    }

    public UserProfileResponse updateMyProfile(
            String email,
            UpdateProfileRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (request.getName() != null) {
            user.setName(request.getName());
        }

        userRepository.save(user);

        Profile profile = profileRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    Profile newProfile = new Profile();
                    newProfile.setUser(user);
                    return newProfile;
                });

        profile.setLocation(request.getLocation());
        profile.setPhone(request.getPhone());
        profile.setAbout(request.getAbout());
        profile.setSkills(request.getSkills());
        profile.setExperience(request.getExperience());
        profile.setProjects(request.getProjects());
        profile.setAchievements(request.getAchievements());
        profile.setGithub(request.getGithub());
        profile.setLinkedin(request.getLinkedin());
        profile.setPortfolio(request.getPortfolio());

        Profile savedProfile = profileRepository.save(profile);

        return mapToResponse(user, savedProfile);
    }

    private UserProfileResponse mapToResponse(
            User user,
            Profile profile) {

        UserProfileResponse response = new UserProfileResponse();

        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());

        if (profile != null) {
            response.setLocation(profile.getLocation());
            response.setPhone(profile.getPhone());
            response.setAbout(profile.getAbout());
            response.setSkills(profile.getSkills());
            response.setExperience(profile.getExperience());
            response.setProjects(profile.getProjects());
            response.setAchievements(profile.getAchievements());
            response.setGithub(profile.getGithub());
            response.setLinkedin(profile.getLinkedin());
            response.setPortfolio(profile.getPortfolio());
        }

        return response;
    }
}
