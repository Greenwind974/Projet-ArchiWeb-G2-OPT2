package com.polytech.polytech.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "There is no user in the user list.")
public class NoUserInListException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = -3115757593445665009L;
}
