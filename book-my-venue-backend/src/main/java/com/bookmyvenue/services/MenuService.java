package com.bookmyvenue.services;

import com.bookmyvenue.dto.FoodCategoryDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface MenuService {
    void addMenu(Long venueId, List<FoodCategoryDto> foodMenu, Map<String, MultipartFile> allParts);
}
