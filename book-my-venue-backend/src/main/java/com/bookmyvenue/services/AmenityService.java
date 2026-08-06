package com.bookmyvenue.services;

import com.bookmyvenue.entities.Amenity;

import java.util.List;


public interface AmenityService {
    List<Amenity> getAllAmenities();

    String addAmentiy(String amenity);

    Amenity getAmenityById(Long amenityId);
}
