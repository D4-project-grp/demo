package com.bookmyvenue.entities;

import java.util.List;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name="food_items")
@AttributeOverride(name="id",column=@Column(name="fooditem_id"))
public class FoodItem extends BaseEntity {
	@Column(name="food_name",length=150)
    private String foodName;
    
	@Column(name="food_type",length=50)
	@Enumerated(EnumType.STRING)
    private FoodType foodType;

	@Column(length=1000)
    private String description;
    
    private Double price;
    
    @ManyToOne(fetch=FetchType.EAGER)//many food items can be associated with one menu 
    @JoinColumn(name="menu_id")
    private Menu menu;
    
    @OneToMany(mappedBy="foodItem",cascade=CascadeType.ALL,
    		orphanRemoval=true,fetch=FetchType.LAZY)
    private List<FoodImage> images;

    @OneToMany(mappedBy="foodItem",fetch=FetchType.LAZY)
    private List<BookedFoodItem> bookedFoodItems;
    
}
