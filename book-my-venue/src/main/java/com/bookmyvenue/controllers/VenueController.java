package com.bookmyvenue.controllers;


import com.bookmyvenue.dto.AddVenueRequest;
import com.bookmyvenue.services.VenueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class VenueController {
    final private VenueService venueService;
    @PostMapping("/venue")
    public ResponseEntity<?> addVenue(
            @RequestPart AddVenueRequest addVenueRequest,
            @RequestPart List<MultipartFile> images
    ) {

        venueService.addVenue(addVenueRequest,images);
        return ResponseEntity.ok("Uploaded");
    }
}
