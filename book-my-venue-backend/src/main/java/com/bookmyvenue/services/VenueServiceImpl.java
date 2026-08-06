package com.bookmyvenue.services;

import com.bookmyvenue.custom_exception.ResourceNotFoundException;
import com.bookmyvenue.dto.*;
import com.bookmyvenue.entities.*;
import com.bookmyvenue.enums.UploadFolder;
import com.bookmyvenue.repository.SubscriptionRepository;
import com.bookmyvenue.repository.UserRepository;
import com.bookmyvenue.repository.VenueRepository;
import jakarta.transaction.Transactional;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import utils.PrincipleUtils;

import java.io.IOException;
import java.sql.ClientInfoStatus;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor

public class VenueServiceImpl implements VenueService{
    private final UserRepository userRepository;
    private final VenueRepository venueRepository;
    private final VenueSubscriptionService venueSubscriptionService;
    private final FileStorageService fileStorageService;
    private final ModelMapper mapper;
    private final VenueImageService venueImageService;
    private final AmenityService amenityService;
    private final SubscriptionRepository subscriptionRepository;
    @Override
    public Long addVenue(AddVenueRequest addVenueRequest, List<MultipartFile> venueImages) {



        Long userId=(Long)  PrincipleUtils.getPrincipal();

//        1.get User object from db;
        User usr=userRepository.findById(userId).get();
        Venue venue = mapper.map(addVenueRequest, Venue.class);

        venue.setId(null);
        venue.setOwner(usr);
//        2. creating list of Amenity ,creating and adding objects of Amenity , initialize amenities property of Venue class
        Set<Amenity> list = new HashSet<>();

        addVenueRequest.getAmenityIds().forEach((amenityId)->{
            list.add(amenityService.getAmenityById(amenityId));
        });
        venue.setAmenities(list);
//      3. making trasient entity ->persistent
        venue = venueRepository.save(venue);

        Venue venueCopy=venue;
//      4.saving images's path to VenueImage table
        venueImages.forEach((image)->{
            try {
                String imagePath = fileStorageService.saveImage(
                        image,
                        UploadFolder.VENUES.getFolderName()
                );
                VenueImage img=new VenueImage();
                img.setVenue(venueCopy);
                img.setImgUrl(imagePath);
                venueImageService.addImage(img);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
        SubscriptionPackage subscriptionPackage=subscriptionRepository.findById(addVenueRequest.getPackageId()).get();
        LocalDate startDate = LocalDate.now();

        LocalDate expiryDate = startDate.plusDays(
                subscriptionPackage.getValidityDays()
        );
//       5.setting object of selected Subscription package
        VenueSubscription venueSubscription=new VenueSubscription(venue,subscriptionPackage,startDate,expiryDate, SubscriptionStatus.ACTIVE);
        venueSubscription.setVenue(venue);
        venueSubscriptionService.add(venueSubscription);


//        return new ApiResponse<Integer>(true,"hi",12, LocalDateTime.now());
          return venue.getId();
    }

    @Override
    public List<VenueCardResponse> getAllVenuesByUser(Long ownerId) {
          List<Venue> venues=venueRepository.findByOwnerId(ownerId);

          List<VenueCardResponse> list=new ArrayList<>();
          venues.forEach((venue)->{
              VenueCardResponse cardResponse = new VenueCardResponse();
              cardResponse.setVenueId(venue.getId());
              cardResponse.setVenueName(venue.getVenueName());
              cardResponse.setCity(venue.getAddress().getCity());
              cardResponse.setLocality(venue.getAddress().getLocality());
              cardResponse.setPrice(venue.getPrice());
              cardResponse.setStatus(venue.getStatus());
              cardResponse.setGuestCapacity(venue.getGuestCapacity());

              String img_url=venue.getImages().get(0).getImgUrl();
              if (img_url != null) {
                  img_url = "http://localhost:2003/uploads/" + img_url;
              }
              cardResponse.setImg_url(img_url);

               list.add(cardResponse);


          });
          return list;

    }

<<<<<<< HEAD:book-my-venue/src/main/java/com/bookmyvenue/services/VenueServiceImpl.java
    @Override
    public List<VenueCardResponse> getAllVenues() {
        List<Venue> venues=venueRepository.findAll();

        List<VenueCardResponse> list=new ArrayList<>();
        venues.forEach((venue)->{
            VenueCardResponse cardResponse = new VenueCardResponse();
            cardResponse.setVenueId(venue.getId());
            cardResponse.setVenueName(venue.getVenueName());
            cardResponse.setCity(venue.getAddress().getCity());
            cardResponse.setLocality(venue.getAddress().getLocality());
            cardResponse.setPrice(venue.getPrice());
            cardResponse.setStatus(venue.getStatus());
            cardResponse.setGuestCapacity(venue.getGuestCapacity());

            String img_url=venue.getImages().get(0).getImgUrl();
            if (img_url != null) {
                img_url = "http://localhost:2003/uploads/" + img_url;
            }
            cardResponse.setImg_url(img_url);

            list.add(cardResponse);


        });
        return list;
=======
    // ---- Admin methods ----

    // Admin uses this to see venues by their status - e.g. all PENDING ones waiting for approval,
    // or all APPROVED ones already live on the site.
    @Override
    public List<AdminVenueResponse> getVenuesByStatus(VenueStatus status) {

        // Step 1: get all venues that match the given status from the database
        List<Venue> venues = venueRepository.findByStatus(status);

        // Step 2: we can't just return the Venue entities directly to the frontend,
        // so we convert (map) each Venue into a simpler AdminVenueResponse object
        List<AdminVenueResponse> result = new ArrayList<>();

        for (Venue venue : venues) {
            AdminVenueResponse response = new AdminVenueResponse();

            response.setId(venue.getId());
            response.setName(venue.getVenueName());
            response.setCity(venue.getAddress().getCity());
            response.setCapacity(venue.getGuestCapacity());
            response.setPricePerDay(venue.getPrice());
            response.setDescription(venue.getDescription());
            response.setStatus(venue.getStatus());

            // owner is a User object, we only want to show their name
            String ownerName = venue.getOwner().getFirstName() + " " + venue.getOwner().getLastName();
            response.setOwner(ownerName);

            // amenities is a Set<Amenity>, but we only want the amenity names as plain text
            List<String> amenityNames = new ArrayList<>();
            for (Amenity amenity : venue.getAmenities()) {
                amenityNames.add(amenity.getAmenityName());
            }
            response.setAmenities(amenityNames);

            // pick the first image if one exists, otherwise leave it null
            String imageUrl = null;
            if (!venue.getImages().isEmpty()) {
                imageUrl = "http://localhost:2003/uploads/" + venue.getImages().get(0).getImgUrl();
            }
            response.setImg_url(imageUrl);

            result.add(response);
        }

        return result;
    }

    // Admin clicks "Approve" -> find that venue by id, change its status, save it back
    @Override
    public void approveVenue(Long venueId) {
        Venue venue = venueRepository.findById(venueId)
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id " + venueId));

        venue.setStatus(VenueStatus.APPROVED);
        venueRepository.save(venue);
    }

    // same idea as approveVenue, just sets status to REJECTED instead
    @Override
    public void rejectVenue(Long venueId) {
        Venue venue = venueRepository.findById(venueId)
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id " + venueId));

        venue.setStatus(VenueStatus.REJECTED);
        venueRepository.save(venue);
>>>>>>> feature/admven:book-my-venue-backend/src/main/java/com/bookmyvenue/services/VenueServiceImpl.java
    }
}
