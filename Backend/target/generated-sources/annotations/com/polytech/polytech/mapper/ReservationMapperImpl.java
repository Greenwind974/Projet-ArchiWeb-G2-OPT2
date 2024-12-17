package com.polytech.polytech.mapper;

import com.polytech.polytech.DTO.ReservationDTO;
import com.polytech.polytech.entity.Reservation;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor"
)
@Component
public class ReservationMapperImpl implements ReservationMapper {

    @Override
    public Reservation toEntity(ReservationDTO Resa) {
        if ( Resa == null ) {
            return null;
        }

        Reservation.ReservationBuilder reservation = Reservation.builder();

        reservation.id( Resa.getId() );
        reservation.number( Resa.getNumber() );
        reservation.utilisateur( Resa.getUtilisateur() );
        reservation.terrain( Resa.getTerrain() );

        return reservation.build();
    }

    @Override
    public ReservationDTO toDTO(Reservation Resa) {
        if ( Resa == null ) {
            return null;
        }

        ReservationDTO.ReservationDTOBuilder reservationDTO = ReservationDTO.builder();

        reservationDTO.id( Resa.getId() );
        reservationDTO.number( Resa.getNumber() );

        return reservationDTO.build();
    }
}
