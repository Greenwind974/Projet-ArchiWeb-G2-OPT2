package com.polytech.polytech.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "The terrain has not been found")
public class TerrainNotFoundException extends RuntimeException{
    @Serial
    private static final long serialVersionUID = -522670554947533091L;
}
