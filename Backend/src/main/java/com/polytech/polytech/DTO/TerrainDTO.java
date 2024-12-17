package com.polytech.polytech.DTO;

import com.polytech.polytech.entity.Reservation;
import lombok.*;

import java.util.Set;


@Builder
@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@ToString
public class TerrainDTO {

    private Integer id;
    private String nom;
    private int quantite;
    private String description;
    private String point_geo;
    Set<Reservation> Reservations;

}
