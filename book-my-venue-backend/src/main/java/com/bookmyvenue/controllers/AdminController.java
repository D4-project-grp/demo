package com.bookmyvenue.controllers;

import com.bookmyvenue.dto.AdminVenueResponse;
import com.bookmyvenue.dto.ApiResponse;
import com.bookmyvenue.entities.VenueStatus;
import com.bookmyvenue.services.VenueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/venues")
public class AdminController {
    private final VenueService venueService;

    // venues waiting for admin's approval
    @GetMapping("/pending")
    public ResponseEntity<?> getPendingVenues(){
        List<AdminVenueResponse> venues = venueService.getVenuesByStatus(VenueStatus.PENDING);
        return ResponseEntity.ok(new ApiResponse<List<AdminVenueResponse>>(true, null, venues, LocalDateTime.now()));
    }

    // venues already approved
    @GetMapping("/approved")
    public ResponseEntity<?> getApprovedVenues(){
        List<AdminVenueResponse> venues = venueService.getVenuesByStatus(VenueStatus.APPROVED);
        return ResponseEntity.ok(new ApiResponse<List<AdminVenueResponse>>(true, null, venues, LocalDateTime.now()));
    }

    @PatchMapping("/{venueId}/approve")
    public ResponseEntity<?> approveVenue(@PathVariable Long venueId){
        venueService.approveVenue(venueId);
        return ResponseEntity.ok(new ApiResponse<String>(true, "Venue approved successfully", null, LocalDateTime.now()));
    }

    @PatchMapping("/{venueId}/reject")
    public ResponseEntity<?> rejectVenue(@PathVariable Long venueId){
        venueService.rejectVenue(venueId);
        return ResponseEntity.ok(new ApiResponse<String>(true, "Venue rejected successfully", null, LocalDateTime.now()));
    }
}
