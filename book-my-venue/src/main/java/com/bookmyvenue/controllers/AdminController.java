package com.bookmyvenue.controllers;

import com.bookmyvenue.dto.*;
import com.bookmyvenue.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {
     private final AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard(){
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(@RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "10") int size){
        return ResponseEntity.ok(adminService.getAllUsers(page, size));
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId){
        return ResponseEntity.ok(adminService.getUserById(userId));
    }

    @PatchMapping("/users/{userId}/status")
    public ResponseEntity<?> updateUserStatus(@PathVariable Long userId,
                                               @RequestBody UpdateUserStatusRequest request){
        return ResponseEntity.ok(adminService.updateUserStatus(userId, request));
    }

    @GetMapping("/venues")
    public ResponseEntity<?> getAllVenues(@RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "10") int size){
        return ResponseEntity.ok(adminService.getAllVenues(page, size));
    }

    @GetMapping("/venues/pending")
    public ResponseEntity<?> getPendingVenues(){
        return ResponseEntity.ok(adminService.getPendingVenues());
    }

    @PatchMapping("/venues/{venueId}/approve")
    public ResponseEntity<?> approveVenue(@PathVariable Long venueId){
        return ResponseEntity.ok(adminService.approveVenue(venueId));
    }

    @PatchMapping("/venues/{venueId}/reject")
    public ResponseEntity<?> rejectVenue(@PathVariable Long venueId,
                                          @RequestBody RejectVenueRequest request){
        return ResponseEntity.ok(adminService.rejectVenue(venueId, request));
    }

    @GetMapping("/bookings")
    public ResponseEntity<?> getAllBookings(@RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "10") int size){
        return ResponseEntity.ok(adminService.getAllBookings(page, size));
    }

    @GetMapping("/payments")
    public ResponseEntity<?> getAllPayments(@RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "10") int size){
        return ResponseEntity.ok(adminService.getAllPayments(page, size));
    }

    @GetMapping("/reviews")
    public ResponseEntity<?> getAllReviews(@RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "10") int size){
        return ResponseEntity.ok(adminService.getAllReviews(page, size));
    }

    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable Long reviewId){
        return ResponseEntity.ok(adminService.deleteReview(reviewId));
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getAdminProfile(){
        return ResponseEntity.ok(adminService.getAdminProfile(getCurrentAdminId()));
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateAdminProfile(@RequestBody UpdateAdminProfileRequest request){
        return ResponseEntity.ok(adminService.updateAdminProfile(getCurrentAdminId(), request));
    }

    @PatchMapping("/profile/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request){
        return ResponseEntity.ok(adminService.changePassword(getCurrentAdminId(), request));
    }

    @PostMapping("/profile/image")
    public ResponseEntity<?> uploadProfileImage(@RequestParam MultipartFile image) throws IOException {
        return ResponseEntity.ok(adminService.uploadProfileImage(getCurrentAdminId(), image));
    }

    // JwtVerificationFilter puts the logged-in user_id (Long) as the auth principal
    private Long getCurrentAdminId(){
        return (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}

