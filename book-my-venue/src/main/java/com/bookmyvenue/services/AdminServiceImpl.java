package com.bookmyvenue.services;

import com.bookmyvenue.custom_exception.AuthenticationFailedException;
import com.bookmyvenue.custom_exception.ResourceNotFoundException;
import com.bookmyvenue.dto.*;
import com.bookmyvenue.entities.*;
import com.bookmyvenue.enums.UploadFolder;
import com.bookmyvenue.repository.BookingRepository;
import com.bookmyvenue.repository.PaymentRepository;
import com.bookmyvenue.repository.ReviewRepository;
import com.bookmyvenue.repository.UserRepository;
import com.bookmyvenue.repository.VenueRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final VenueRepository venueRepository;
    private final BookingRepository bookingRepository;
    private final PaymentRepository paymentRepository;
    private final ReviewRepository reviewRepository;
    private final PasswordEncoder encoder;
    private final FileStorageService fileStorageService;

    @Override
    public DashboardStatsDto getDashboardStats() {

        long totalUsers = userRepository.count();
        long totalCustomers = userRepository.countByRole(UserRole.CUSTOMER);
        long totalVenueOwners = userRepository.countByRole(UserRole.VENUE_OWNER);

        long totalVenues = venueRepository.count();
        long approvedVenues = venueRepository.countByStatus(VenueStatus.APPROVED);
        long pendingVenues = venueRepository.countByStatus(VenueStatus.PENDING);
        long rejectedVenues = venueRepository.countByStatus(VenueStatus.REJECTED);

        long totalBookings = bookingRepository.count();
        long completedBookings = bookingRepository.countByStatus(BookingStatus.COMPLETED);
        long cancelledBookings = bookingRepository.countByStatus(BookingStatus.CANCELLED);

        double totalRevenue = paymentRepository.sumAmountByStatus(PaymentStatus.SUCCESS);

        DashboardStatsDto dashboard = new DashboardStatsDto(
                totalUsers,
                totalCustomers,
                totalVenueOwners,
                totalVenues,
                approvedVenues,
                pendingVenues,
                rejectedVenues,
                totalBookings,
                completedBookings,
                cancelledBookings,
                totalRevenue
        );

        return dashboard;
    }

    @Override
    public PageResponse<UserListDto> getAllUsers(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<User> userPage = userRepository.findAll(pageable);

        List<UserListDto> userList = new ArrayList<>();

        for (User user : userPage.getContent()) {

            UserListDto dto = new UserListDto(
                    user.getId(),
                    user.getFirstName() + " " + user.getLastName(),
                    user.getEmail(),
                    user.getMobileNo(),
                    user.getRole(),
                    user.getStatus()
            );

            userList.add(dto);
        }

        return new PageResponse<>(
                userList,
                page,
                size,
                userPage.getTotalElements()
        );
    }

    @Override
    public UserDetailDto getUserById(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        UserDetailDto dto = new UserDetailDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getMobileNo(),
                user.getRole(),
                user.getStatus()
        );

        return dto;
    }

    @Override
    public MessageResponse updateUserStatus(Long userId,
                                            UpdateUserStatusRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        user.setStatus(request.getStatus());

        userRepository.save(user);

        return new MessageResponse(
                "User status updated successfully"
        );
    }

    @Override
    public PageResponse<VenueListDto> getAllVenues(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<Venue> venuePage = venueRepository.findAll(pageable);

        List<VenueListDto> venueList = new ArrayList<>();

        for (Venue venue : venuePage.getContent()) {

            VenueListDto dto = new VenueListDto(
                    venue.getId(),
                    venue.getVenueName(),
                    venue.getOwner().getFirstName() + " " +
                            venue.getOwner().getLastName(),
                    venue.getAddress().getCity(),
                    venue.getStatus()
            );

            venueList.add(dto);
        }

        return new PageResponse<>(
                venueList,
                page,
                size,
                venuePage.getTotalElements()
        );
    }

    @Override
    public List<PendingVenueDto> getPendingVenues() {

        List<Venue> venues =
                venueRepository.findByStatus(VenueStatus.PENDING);

        List<PendingVenueDto> pendingVenueList =
                new ArrayList<>();

        for (Venue venue : venues) {

            PendingVenueDto dto = new PendingVenueDto(
                    venue.getId(),
                    venue.getVenueName(),
                    venue.getOwner().getFirstName() + " " +
                            venue.getOwner().getLastName()
            );

            pendingVenueList.add(dto);
        }

        return pendingVenueList;
    }

    @Override
    public VenueActionResponse approveVenue(Long venueId) {

        Venue venue = venueRepository.findById(venueId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Venue not found"));

        venue.setStatus(VenueStatus.APPROVED);

        venueRepository.save(venue);

        return new VenueActionResponse(
                venue.getId(),
                venue.getStatus(),
                "Venue approved successfully"
        );
    }

    @Override
    public VenueActionResponse rejectVenue(Long venueId,
                                           RejectVenueRequest request) {

        Venue venue = venueRepository.findById(venueId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Venue not found"));

        venue.setStatus(VenueStatus.REJECTED);

        venue.setRejectionReason(request.getReason());

        venueRepository.save(venue);

        return new VenueActionResponse(
                venue.getId(),
                venue.getStatus(),
                "Venue rejected successfully"
        );
    }
    
    
    
    
    @Override
    public PageResponse<BookingListDto> getAllBookings(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<Booking> bookingPage = bookingRepository.findAll(pageable);

        List<BookingListDto> bookingList = new ArrayList<>();

        for (Booking booking : bookingPage.getContent()) {

            BookingListDto dto = new BookingListDto(
                    booking.getBookingId(),
                    booking.getCustomer().getFirstName() + " " +
                            booking.getCustomer().getLastName(),
                    booking.getVenue().getVenueName(),
                    booking.getStatus(),
                    booking.getCost()
            );

            bookingList.add(dto);
        }

        return new PageResponse<>(
                bookingList,
                page,
                size,
                bookingPage.getTotalElements()
        );
    }

    @Override
    public PageResponse<PaymentListDto> getAllPayments(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<Payment> paymentPage = paymentRepository.findAll(pageable);

        List<PaymentListDto> paymentList = new ArrayList<>();

        for (Payment payment : paymentPage.getContent()) {

            PaymentListDto dto = new PaymentListDto(
                    payment.getPaymentId(),
                    payment.getBooking().getBookingId(),
                    payment.getAmount(),
                    payment.getStatus()
            );

            paymentList.add(dto);
        }

        return new PageResponse<>(
                paymentList,
                page,
                size,
                paymentPage.getTotalElements()
        );
    }

    @Override
    public PageResponse<ReviewListDto> getAllReviews(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<Review> reviewPage = reviewRepository.findAll(pageable);

        List<ReviewListDto> reviewList = new ArrayList<>();

        for (Review review : reviewPage.getContent()) {

            ReviewListDto dto = new ReviewListDto(
                    review.getReviewId(),
                    review.getBooking().getCustomer().getFirstName() + " " +
                            review.getBooking().getCustomer().getLastName(),
                    review.getBooking().getVenue().getVenueName(),
                    review.getRating(),
                    review.getNote()
            );

            reviewList.add(dto);
        }

        return new PageResponse<>(
                reviewList,
                page,
                size,
                reviewPage.getTotalElements()
        );
    }

    @Override
    public MessageResponse deleteReview(Long reviewId) {

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Review not found"));

        reviewRepository.delete(review);

        return new MessageResponse(
                "Review deleted successfully"
        );
    }

    @Override
    public AdminProfileDto getAdminProfile(Long adminId) {

        User admin = userRepository.findById(adminId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Admin not found"));

        AdminProfileDto profile = new AdminProfileDto(
                admin.getId(),
                admin.getFirstName(),
                admin.getLastName(),
                admin.getEmail(),
                admin.getMobileNo()
        );

        return profile;
    }

    @Override
    public MessageResponse updateAdminProfile(Long adminId,
                                              UpdateAdminProfileRequest request) {

        User admin = userRepository.findById(adminId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Admin not found"));

        admin.setFirstName(request.getFirstName());
        admin.setLastName(request.getLastName());
        admin.setEmail(request.getEmail());
        admin.setMobileNo(request.getMobile());

        userRepository.save(admin);

        return new MessageResponse(
                "Profile updated successfully"
        );
    }

    @Override
    public MessageResponse changePassword(Long adminId,
                                          ChangePasswordRequest request) {

        User admin = userRepository.findById(adminId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Admin not found"));

        boolean isCorrectPassword =
                encoder.matches(
                        request.getCurrentPassword(),
                        admin.getPassword()
                );

        if (!isCorrectPassword) {
            throw new AuthenticationFailedException(
                    "Current password is incorrect"
            );
        }

        if (!request.getNewPassword()
                .equals(request.getConfirmPassword())) {

            throw new AuthenticationFailedException(
                    "New password and confirm password do not match"
            );
        }

        String encodedPassword =
                encoder.encode(request.getNewPassword());

        admin.setPassword(encodedPassword);

        userRepository.save(admin);

        return new MessageResponse(
                "Password changed successfully"
        );
    }

    @Override
    public ImageUploadResponse uploadProfileImage(Long adminId,
                                                  MultipartFile image)
            throws IOException {

        User admin = userRepository.findById(adminId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Admin not found"));

        String imagePath = fileStorageService.saveImage(
                image,
                UploadFolder.PROFILE_IMAGES.getFolderName()
        );

        admin.setProfileImg(imagePath);

        userRepository.save(admin);

        return new ImageUploadResponse(
                imagePath,
                "Profile image uploaded successfully"
        );
    }
}