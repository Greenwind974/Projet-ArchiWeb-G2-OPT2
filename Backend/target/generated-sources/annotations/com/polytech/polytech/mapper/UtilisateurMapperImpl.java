package com.polytech.polytech.mapper;

import com.polytech.polytech.DTO.UtilisateurDTO;
import com.polytech.polytech.entity.Utilisateur;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor"
)
@Component
public class UtilisateurMapperImpl implements UtilisateurMapper {

    @Override
    public Utilisateur toEntity(UtilisateurDTO User) {
        if ( User == null ) {
            return null;
        }

        Utilisateur.UtilisateurBuilder utilisateur = Utilisateur.builder();

        utilisateur.id( User.getId() );
        utilisateur.nom( User.getNom() );
        utilisateur.prenom( User.getPrenom() );
        utilisateur.mail( User.getMail() );
        utilisateur.password( User.getPassword() );
        utilisateur.username( User.getUsername() );

        return utilisateur.build();
    }

    @Override
    public UtilisateurDTO toDTO(Utilisateur User) {
        if ( User == null ) {
            return null;
        }

        UtilisateurDTO.UtilisateurDTOBuilder utilisateurDTO = UtilisateurDTO.builder();

        utilisateurDTO.id( User.getId() );
        utilisateurDTO.nom( User.getNom() );
        utilisateurDTO.prenom( User.getPrenom() );
        utilisateurDTO.mail( User.getMail() );
        utilisateurDTO.password( User.getPassword() );
        utilisateurDTO.username( User.getUsername() );

        return utilisateurDTO.build();
    }
}
