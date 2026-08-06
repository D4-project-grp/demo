package com.bookmyvenue.services;

import com.bookmyvenue.dto.AddVenueRequest;
import com.bookmyvenue.dto.AdminVenueResponse;
import com.bookmyvenue.dto.ApiResponse;
import com.bookmyvenue.dto.VenueCardResponse;
import com.bookmyvenue.entities.VenueStatus;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VenueService {
     Long addVenue(AddVenueRequest addVenueRequest, List<MultipartFile> images);

    List<VenueCardResponse> getAllVenuesByUser(Long ownerId);

    // ---- Admin methods ----
    List<AdminVenueResponse> getVenuesByStatus(VenueStatus status);

    void approveVenue(Long venueId);

    void rejectVenue(Long venueId);
}
