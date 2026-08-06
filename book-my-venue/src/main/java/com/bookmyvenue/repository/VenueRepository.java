package com.bookmyvenue.repository;

import com.bookmyvenue.entities.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VenueRepository extends JpaRepository<Venue,Long> {


    List<Venue> findByOwnerId(Long OwnerId);
}
