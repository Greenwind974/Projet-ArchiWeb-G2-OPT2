package com.polytech.polytech.mapper;

import com.polytech.polytech.DTO.UserAccountDTO;
import com.polytech.polytech.entity.UserAccount;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserAccountMapper {

    /**
     * Transforme les DTO en entité
     *
     * @param userAccountDTO
     * @return Objet {@link UserAccount}
     */
    UserAccount toEntity(UserAccountDTO userAccountDTO);

    /**
     * Transforme les entité en DTO
     *
     * @param userAccount
     * @return Objet {@link UserAccountDTO}
     */
    UserAccountDTO toDTO(UserAccount userAccount);
}
