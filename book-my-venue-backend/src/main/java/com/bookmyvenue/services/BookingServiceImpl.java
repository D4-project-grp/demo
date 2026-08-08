package com.bookmyvenue.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.bookmyvenue.custom_exception.ResourceNotFoundException;
import com.bookmyvenue.dto.BookedFoodItemResponse;
import com.bookmyvenue.dto.BookingResponse;
import com.bookmyvenue.dto.CreateBookingRequest;
import com.bookmyvenue.entities.BookedFoodItem;
import com.bookmyvenue.entities.Booking;
import com.bookmyvenue.entities.BookingStatus;
import com.bookmyvenue.entities.FoodItem;
import com.bookmyvenue.entities.User;
import com.bookmyvenue.entities.Venue;
import com.bookmyvenue.repository.BookingRepository;
import com.bookmyvenue.repository.FoodItemRepository;
import com.bookmyvenue.repository.UserRepository;
import com.bookmyvenue.repository.VenueRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

	private final BookingRepository bookingRepository;
	 
	private final VenueRepository venueRepository;
	private final UserRepository userRepository;
	private final FoodItemRepository foodItemRepository;
	private final ModelMapper mapper;

	@Override
	
	public BookingResponse createBooking(CreateBookingRequest request,Long userId) {

		Venue venue = venueRepository.findById(request.getVenueId())
				.orElseThrow(() -> new ResourceNotFoundException("Venue not found with id " + request.getVenueId()));

		User customer=userRepository.findById(userId).orElseThrow(()->new ResourceNotFoundException("customer doesn't exist"));
		if (!request.getEndDate().isAfter(request.getStartDate())
				&& !request.getEndDate().isEqual(request.getStartDate())) {
			throw new IllegalArgumentException("endDate cannot be before startDate");
		}

		if (request.getNoOfGuests() > venue.getGuestCapacity()) {
			throw new IllegalArgumentException(
					"noOfGuests exceeds venue capacity of " + venue.getGuestCapacity());
		}

		List<FoodItem> foodItems = new ArrayList<>();
		if (request.getFoodItemIds() != null && !request.getFoodItemIds().isEmpty()) {
			foodItems = foodItemRepository.findAllById(request.getFoodItemIds());

			if (foodItems.size() != request.getFoodItemIds().size()) {
				throw new  ResourceNotFoundException("One or more food items could not be found");
			}
		}

		BigDecimal guests = BigDecimal.valueOf(request.getNoOfGuests());

		BigDecimal foodCost = foodItems.stream()
				.map(item -> item.getPrice().multiply(guests))
				.reduce(BigDecimal.ZERO, BigDecimal::add);
		BigDecimal totalCost = venue.getPrice().add(foodCost);

		Booking booking = new Booking();
		booking.setStatus(BookingStatus.CONFIRMED);
		booking.setEventType(request.getEventType());
		booking.setStartDate(request.getStartDate());
		booking.setEndDate(request.getEndDate());
		booking.setNoOfGuests(request.getNoOfGuests());
		booking.setCost(totalCost);
		booking.setBookedAt(LocalDateTime.now());
		booking.setVenue(venue);
		booking.setCustomer(customer);

		Booking savedBooking = bookingRepository.save(booking);

		List<BookedFoodItem> bookedFoodItems = foodItems.stream().map(foodItem -> {
			BookedFoodItem bfi = new BookedFoodItem();
			bfi.setFoodItem(foodItem);
			bfi.setBooking(savedBooking);
			bfi.setCost(foodItem.getPrice().multiply(guests));
			return bfi;
		}).collect(Collectors.toList());
		savedBooking.setBookedFoodItems(bookedFoodItems);
		BookingResponse bookingResponse=mapper.map(savedBooking,BookingResponse.class);
		bookingResponse.setVenueId(request.getVenueId());
		bookingResponse.setVenueName(venue.getVenueName());
		 
		
		 
		 
		return bookingResponse;
 
	}
	public boolean isVenueAvailable(Long venueId, LocalDate startDate, LocalDate endDate) {
	    return !bookingRepository.existsOverlappingBooking(venueId, startDate, endDate);
	}
	 

	 
}
