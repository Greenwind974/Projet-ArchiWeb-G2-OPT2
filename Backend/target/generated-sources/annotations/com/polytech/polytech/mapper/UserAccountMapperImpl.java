package com.polytech.polytech.mapper;

import com.polytech.polytech.DTO.UserAccountDTO;
import com.polytech.polytech.entity.UserAccount;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor"
)
@Component
public class UserAccountMapperImpl implements UserAccountMapper {

    @Override
    public UserAccount toEntity(UserAccountDTO userAccountDTO) {
        if ( userAccountDTO == null ) {
            return null;
        }

        UserAccount userAccount = new UserAccount();

        userAccount.setUsername( userAccountDTO.getUsername() );
        userAccount.setPassword( userAccountDTO.getPassword() );

        return userAccount;
    }

    @Override
    public UserAccountDTO toDTO(UserAccount userAccount) {
        if ( userAccount == null ) {
            return null;
        }

        UserAccountDTO userAccountDTO = new UserAccountDTO();

        userAccountDTO.setUsername( userAccount.getUsername() );
        userAccountDTO.setPassword( userAccount.getPassword() );

        return userAccountDTO;
    }
}
