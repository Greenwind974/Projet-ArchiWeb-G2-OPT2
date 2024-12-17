package com.polytech.polytech.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;


//pour getAllTerrains
@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "There is no terrain in the terrain list.")
public class NoTerrainInListException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;
    }

