package com.bookmyvenue.repository;

import com.bookmyvenue.entities.VenueImage;
import com.bookmyvenue.services.VenueImageService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VenueImageRepository extends JpaRepository<VenueImage,Long> {
}
