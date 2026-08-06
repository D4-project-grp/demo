package com.bookmyvenue.dto;

import com.bookmyvenue.entities.Amenity;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.List;

public class VenueResponse {

    String venueName;

    String description;

    String phoneNo;

    AddressRequest address;

    BigDecimal price;

    Integer guestCapacity;

    Long packageId;

    List<Amenity> amenities;



    List<FoodCategoryDto> foodMenu;
}
