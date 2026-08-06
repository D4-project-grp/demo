package com.bookmyvenue.services;

import com.bookmyvenue.dto.*;
import com.bookmyvenue.entities.*;
import com.bookmyvenue.enums.UploadFolder;
import com.bookmyvenue.repository.SubscriptionRepository;
import com.bookmyvenue.repository.UserRepository;
import com.bookmyvenue.repository.VenueRepository;
import com.sun.tools.jconsole.JConsoleContext;
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
    final private UserRepository userRepository;
    final private VenueRepository venueRepository;
    final private VenueSubscriptionService venueSubscriptionService;
    final private  FileStorageService fileStorageService;
    final private ModelMapper mapper;
    final private VenueImageService venueImageService;
    final private AmenityService amenityService;
    final private SubscriptionRepository subscriptionRepository;
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
    }
}
