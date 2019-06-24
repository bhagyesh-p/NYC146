package com.dogboy60.NYC146.controller;

import com.ups.ops.cipe.logging.LoggingUtility;
import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class ErrorHandlingController {
    private final LoggingUtility log = new LoggingUtility(ErrorHandlingController.class);

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> catchAll(Exception e) throws Exception {
        log.error("Unhandled Exception caught in ErrorHandlingController.", e);
        ExceptionResponse exceptionResponse = new ExceptionResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "There was an unexpected error while processing your request. Please try again.");
        return new ResponseEntity<>(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ExceptionResponse> illegalArgumentException(IllegalArgumentException e) throws Exception {
        ExceptionResponse exceptionResponse = new ExceptionResponse(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        return new ResponseEntity<>(exceptionResponse,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TypeMismatchException.class)
    public ResponseEntity<ExceptionResponse> typeMismatchException (TypeMismatchException e) throws Exception {
        ExceptionResponse exceptionResponse = new ExceptionResponse(HttpStatus.BAD_REQUEST.value(), "Failed to convert value '" + e.getValue() + "' to required type: " + e.getRequiredType());
        return new ResponseEntity<>(exceptionResponse,HttpStatus.BAD_REQUEST);
    }

}
