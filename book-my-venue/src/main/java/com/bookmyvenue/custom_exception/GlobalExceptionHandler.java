package com.bookmyvenue.custom_exception;

import java.time.LocalDateTime;

import com.bookmyvenue.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;



@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handlerResourceNotFoundException(ResourceNotFoundException e){
		 return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, e.getMessage(),null,LocalDateTime.now()));
	}
    @ExceptionHandler(AuthenticationFailedException.class)
    public ResponseEntity<?> handlerAthenticationFailedException(AuthenticationFailedException e){
    	 return ResponseEntity.badRequest().body(new ApiResponse(false ,e.getMessage(),null,LocalDateTime.now()));
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handlerPresentationValidationException(MethodArgumentNotValidException e){
    	 return ResponseEntity.badRequest().body(new ApiResponse( false,e.getAllErrors().getFirst().getDefaultMessage(), null,LocalDateTime.now()));
    }
    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<?> handlerResourceAlreadyExistsException(ResourceAlreadyExistsException e){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse( false,e.getMessage(), null,LocalDateTime.now()));

    }
    
}
