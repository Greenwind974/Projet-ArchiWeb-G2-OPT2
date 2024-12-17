package com.polytech.polytech;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;


@SpringBootApplication
public class PolytechApplication {

	public static void main(String[] args) {
		try{
			SpringApplication.run(PolytechApplication.class, args);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
