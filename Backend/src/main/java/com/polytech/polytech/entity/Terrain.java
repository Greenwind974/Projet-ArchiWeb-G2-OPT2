package com.polytech.polytech.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@ToString
@Table(name = "terrain")
public class Terrain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name="nom")
    private String nom;

    @Column(name="quantite")
    private int quantite;

    @Column(name="description")
    private String description;

    @Column(name="point_geo")
    private String point_geo;

    @OneToMany(mappedBy = "terrain")
    Set<Reservation> Reservations;

}
