package com.bookmyvenue.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class AddVenueRequest {
    @JsonAlias("name")
    @NotBlank(message = "Venue name is required.")
    @Size(max = 150)
    String venueName;

    @NotBlank(message = "Description is required.")
    @Size(max = 1000)
    String description;

    @JsonAlias("phone")
    @NotBlank(message = "Phone number is required.")
    @Size(max = 20)
    String phoneNo;

    @NotBlank(message = "Street is required.")
    @Size(max = 150)
    String street;

    @Size(max = 150)
    String locality;

    @NotBlank(message = "City is required.")
    @Size(max = 100)
    String city;

    @NotBlank(message = "Pincode is required.")
    @Pattern(
            regexp = "^[1-9][0-9]{5}$",
            message = "Enter a valid 6-digit pincode."
    )
    String pincode;

    @NotNull(message = "Price is required.")
    @DecimalMin(
            value = "1.0",
            message = "Price must be greater than 0."
    )
    Double price;

    @JsonAlias("guests")
    @NotNull(message = "Guest capacity is required.")
    @Positive(message = "Guest capacity must be greater than 0.")
    Integer guestCapacity;



    /*
     * Used by the current React frontend.
     * Example: ["Parking", "AC", "WiFi"]
     */
    List<Integer> amenities;

    /*
     * Java cannot use the variable name "package"
     * because package is a reserved Java keyword.
     *
     * @JsonAlias allows frontend JSON:
     * "package": "monthly"
     *
     * to be stored in:
     * request.planType()
     */
    @JsonAlias("package")
    @NotBlank(message = "Package is required.")
    @Pattern(
            regexp = "^(monthly|yearly)$",
            message = "Package must be monthly or yearly."
    )
    String planType;

    @Valid
    List<FoodMenuRequest> foodMenu;

}
