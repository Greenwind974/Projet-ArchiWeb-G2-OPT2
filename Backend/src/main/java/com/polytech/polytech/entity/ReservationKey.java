package com.polytech.polytech.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Embeddable
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ReservationKey implements Serializable {

    @Column(name="utilisateur_id")
    private Integer utilisateur_id;

    @Column(name="terrain_id")
    private Integer terrain_id;

}
