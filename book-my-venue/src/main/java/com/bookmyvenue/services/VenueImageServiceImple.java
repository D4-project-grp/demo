package com.bookmyvenue.services;

import com.bookmyvenue.entities.VenueImage;
import com.bookmyvenue.repository.VenueImageRepository;
import io.swagger.v3.oas.annotations.servers.Server;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class VenueImageServiceImple implements VenueImageService{
    final private VenueImageRepository venueImageRepository;
    @Override
    public void addImage(VenueImage img) {

        venueImageRepository.save(img);
    }
}
