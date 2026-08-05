package com.bookmyvenue.repository;

import com.bookmyvenue.entities.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VenueRepository extends JpaRepository<Venue,Long> {

}
