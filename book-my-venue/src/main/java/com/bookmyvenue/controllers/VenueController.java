package com.bookmyvenue.controllers;


import com.bookmyvenue.dto.AddVenueRequest;

import com.bookmyvenue.dto.FoodCategoryDto;
import com.bookmyvenue.services.MenuService;
import com.bookmyvenue.services.VenueService;
import com.sun.tools.jconsole.JConsoleContext;
import com.sun.tools.jconsole.JConsolePlugin;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/venue")
public class VenueController {
    final private VenueService venueService;
    final private MenuService menuService;
    @PostMapping("/listing")
    public ResponseEntity<?> addVenue(
            @RequestPart("data")  AddVenueRequest request, @RequestPart(value = "venueImages") List<MultipartFile> venueImages, @RequestParam Map<String, MultipartFile> allParts
    ) {


        Long venueId=venueService.addVenue(request,venueImages);
        menuService.addMenu(venueId,request.getFoodMenu(),  allParts);
        return ResponseEntity.ok("Uploaded");
    }
}
