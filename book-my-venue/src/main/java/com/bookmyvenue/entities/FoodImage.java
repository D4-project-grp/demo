package com.bookmyvenue.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
 
@Entity
@Table(name="food_images")
public class FoodImage {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="img_id")
	private Long imgId;
	
	@Column(name="img_url")
	private String imgUrl;
	
	@CreationTimestamp
	@Column(name="created_at")
    private LocalDateTime createdAt;
	
	@ManyToOne(fetch=FetchType.LAZY) // one food item can have many images;
	@JoinColumn(name="fooditem_id")
	private FoodItem foodItem;
}
