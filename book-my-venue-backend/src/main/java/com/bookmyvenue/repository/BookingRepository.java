package com.bookmyvenue.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookmyvenue.entities.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
	// Overlap rule: two ranges [s1,e1] and [s2,e2] overlap when s1 <= e2 AND e1 >= s2.
    // CANCELLED bookings don't block the venue, so they're excluded.
    @Query("SELECT COUNT(b) > 0 FROM Booking b " +
           "WHERE b.venue.id = :venueId " +
           "AND b.status <>  BookingStatus.CANCELLED " +
           "AND b.startDate <= :endDate " +
           "AND b.endDate >= :startDate")
    boolean existsOverlappingBooking(@Param("venueId") Long venueId,
                                      @Param("startDate") LocalDate startDate,
                                      @Param("endDate") LocalDate endDate);
}
