package com.bookmyvenue.controllers;


import com.bookmyvenue.dto.AddVenueRequest;

import com.bookmyvenue.dto.ApiResponse;
import com.bookmyvenue.dto.FoodCategoryDto;
import com.bookmyvenue.dto.VenueCardResponse;
import com.bookmyvenue.services.MenuService;
import com.bookmyvenue.services.VenueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import utils.PrincipleUtils;

import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/venues")
public class VenueController {
<<<<<<< HEAD:book-my-venue/src/main/java/com/bookmyvenue/controllers/VenueController.java
    final private VenueService venueService;
    final private MenuService menuService;
    @PostMapping("")
=======

>>>>>>> feature/admven:book-my-venue-backend/src/main/java/com/bookmyvenue/controllers/VenueController.java
    public ResponseEntity<?> addVenue(
            @RequestPart("data")  AddVenueRequest request, @RequestPart(value = "venueImages") List<MultipartFile> venueImages, @RequestParam Map<String, MultipartFile> allParts
    ) {


        Long venueId=venueService.addVenue(request,venueImages);
        menuService.addMenu(venueId,request.getFoodMenu(),  allParts);
        return ResponseEntity.ok("Uploaded");
    }
    @GetMapping("/my-listing")
    public ResponseEntity<?> getAllVenuesByOwnerId(){
        Long ownerId= (Long) PrincipleUtils.getPrincipal();
        List<VenueCardResponse> venueCardResponse=venueService.getAllVenuesByUser(ownerId);
        return ResponseEntity.ok(new ApiResponse<List<VenueCardResponse>>(true,null, venueCardResponse, LocalDateTime.now()));
    }

    @GetMapping("")
    public ResponseEntity<?> getAllVenues(){
        List<VenueCardResponse> venueCardResponse=venueService.getAllVenues();
        return ResponseEntity.ok(new ApiResponse<List<VenueCardResponse>>(true,null, venueCardResponse, LocalDateTime.now()));

    @GetMapping("/{venueId}")
    public ResponseEntity<?> getVenueById(@PathVariable Long venueId){
        // TODO: implement single-venue lookup when needed
        return ResponseEntity.ok("Not implemented yet");

    }

}
