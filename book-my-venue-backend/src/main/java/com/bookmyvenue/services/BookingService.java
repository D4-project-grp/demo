package com.bookmyvenue.services;

 
import java.time.LocalDate;

import com.bookmyvenue.dto.BookingResponse;
import com.bookmyvenue.dto.CreateBookingRequest;

public interface BookingService {
 
	 BookingResponse createBooking(CreateBookingRequest request, Long usrId);

	boolean isVenueAvailable(Long venueId, LocalDate startDate, LocalDate endDate);

	 
}
