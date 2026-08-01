package com.bookmyvenue.services;

import com.bookmyvenue.dto.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface AdminService {

    // Dashboard
    DashboardStatsDto getDashboardStats();

    // User Management
    PageResponse<UserListDto> getAllUsers(int page, int size);

    UserDetailDto getUserById(Long userId);

    MessageResponse updateUserStatus(Long userId,
                                     UpdateUserStatusRequest request);

    // Venue Management
    PageResponse<VenueListDto> getAllVenues(int page, int size);

    List<PendingVenueDto> getPendingVenues();

    VenueActionResponse approveVenue(Long venueId);

    VenueActionResponse rejectVenue(Long venueId,
                                    RejectVenueRequest request);

    // Booking Management
    PageResponse<BookingListDto> getAllBookings(int page, int size);

    // Payment Management
    PageResponse<PaymentListDto> getAllPayments(int page, int size);

    // Review Management
    PageResponse<ReviewListDto> getAllReviews(int page, int size);

    MessageResponse deleteReview(Long reviewId);

    // Admin Profile
    AdminProfileDto getAdminProfile(Long adminId);

    MessageResponse updateAdminProfile(Long adminId,
                                       UpdateAdminProfileRequest request);

    MessageResponse changePassword(Long adminId,
                                   ChangePasswordRequest request);

    ImageUploadResponse uploadProfileImage(Long adminId,
                                           MultipartFile image)
            throws IOException;
}