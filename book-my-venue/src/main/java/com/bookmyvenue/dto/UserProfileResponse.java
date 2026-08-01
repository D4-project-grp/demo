package com.bookmyvenue.dto;

import com.bookmyvenue.entities.Address;
import com.bookmyvenue.entities.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileResponse {
    private String firstName;

    private String lastName;

    private String email;

    private String mobileNo;

    private AddressResponse address;

    private String profileImg;
}