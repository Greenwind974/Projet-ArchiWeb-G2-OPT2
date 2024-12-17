package com.polytech.polytech.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "The user has not been found")
public class UserNotFoundException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = -7037004598000605722L;
}
