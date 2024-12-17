package com.polytech.polytech.mapper;


import com.polytech.polytech.DTO.ReservationDTO;
import com.polytech.polytech.entity.Reservation;
import com.polytech.polytech.entity.ReservationKey;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReservationMapper {


    /**
     * Transforme les DTO en entité
     *
     * @param Resa
     * @return Objet {@link Reservation}
     */
    Reservation toEntity(ReservationDTO Resa);

    /**
     * Transforme les entités en DTO
     *
     * @param Resa
     * @return Objet {@link ReservationDTO}
     */
    ReservationDTO toDTO(Reservation Resa);

}
