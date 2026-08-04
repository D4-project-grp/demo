//package com.bookmyvenue.services;
//
//import com.bookmyvenue.dto.AddVenueRequest;
//import com.bookmyvenue.dto.ApiResponse;
//import com.bookmyvenue.enums.UploadFolder;
//import com.bookmyvenue.repository.VenueRepository;
//import jakarta.transaction.Transactional;
//import lombok.NoArgsConstructor;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContext;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//import utils.PrincipleUtils;
//
//import java.io.IOException;
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Service
//@Transactional
//@RequiredArgsConstructor
//
//public class VenueServiceImpl implements VenueService{
//    final private VenueRepository venueRepository;
//    final private  FileStorageService fileStorageService;
//    @Override
//    public ApiResponse<Integer> addVenue(AddVenueRequest addVenueRequest, List<MultipartFile> images) {
//
//        Long userId=(Long)  PrincipleUtils.getPrincipal();
//
//        images.forEach((image)->{
//            try {
//                String imagePath = fileStorageService.saveImage(
//                        image,
//                        UploadFolder.VENUES.getFolderName()
//                );
//
//            } catch (IOException e) {
//                throw new RuntimeException(e);
//            }
//        });
//
//        return new ApiResponse<Integer>(true,"hi",12, LocalDateTime.now());
//    }
//}
