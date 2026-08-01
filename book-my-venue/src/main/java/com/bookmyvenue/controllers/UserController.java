package com.bookmyvenue.controllers;

import com.bookmyvenue.dto.*;
import com.bookmyvenue.security.CustomUserDetailsImpl;
import com.bookmyvenue.services.UserService;
import com.bookmyvenue.services.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class UserController {
    final private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@ModelAttribute SignupRequest request,
                                    @RequestParam MultipartFile profileImage) throws IOException {
        String msg = userService.registerUser(request, profileImage);

        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<String>(true, msg, null, LocalDateTime.now()));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody SigninRequest request) {
        SigninResponse res = userService.authenticate(request);
        return ResponseEntity.ok().body(new ApiResponse<SigninResponse>(true, null, res, LocalDateTime.now()));
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(){
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication=context.getAuthentication();
        Long userId=(Long)  authentication.getPrincipal();
        UserProfileResponse response=userService.getUserProfile(userId);
        return ResponseEntity.ok(new ApiResponse<UserProfileResponse>(true, null, response, LocalDateTime.now()));
    }
    @PostMapping("/profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody SignupRequest request){
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication=context.getAuthentication();
        Long userId=(Long)  authentication.getPrincipal();
        String msg=userService.updateUserProfile(userId,request);
        return ResponseEntity.ok(new ApiResponse<String>(true,msg,null,LocalDateTime.now()));
    }
    @PostMapping("/profile/change-password")
    public ResponseEntity<?> changePassword(@RequestBody PasswordRequest request){
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication=context.getAuthentication();
        Long userId=(Long)  authentication.getPrincipal();
        String msg=userService.changePassword(userId,request);
        return ResponseEntity.ok(new ApiResponse<String>(true,msg,null,LocalDateTime.now()));
    }
    @PatchMapping("/profile/change-image")
    public ResponseEntity<?> changeProfileImage(@RequestParam MultipartFile profileImage){
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication=context.getAuthentication();
        Long userId=(Long)  authentication.getPrincipal();

        String imageUrl=userService.changeProfileImage(userId,profileImage);

        return ResponseEntity.ok(new ApiResponse<String>(true,null,imageUrl,LocalDateTime.now()));
    }

}
