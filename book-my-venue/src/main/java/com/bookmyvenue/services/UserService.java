package com.bookmyvenue.services;

import com.bookmyvenue.dto.SigninRequest;
import com.bookmyvenue.dto.SignupRequest;
import com.bookmyvenue.dto.SigninResponse;
import com.bookmyvenue.dto.UserProfileResponse;
import com.bookmyvenue.entities.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


public interface UserService {
    String registerUser(SignupRequest signupRequest, MultipartFile profileImage) throws IOException;

    SigninResponse authenticate(SigninRequest request);

    List<User> getAllUsers();

    UserProfileResponse getUserProfile(Long userId);

    String updateUserProfile(Long userId, SignupRequest request);
}
