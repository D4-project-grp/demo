package com.bookmyvenue.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookmyvenue.entities.BookedFoodItem;

public interface BookedFoodItemRepository extends JpaRepository<BookedFoodItem,Long> {

}
