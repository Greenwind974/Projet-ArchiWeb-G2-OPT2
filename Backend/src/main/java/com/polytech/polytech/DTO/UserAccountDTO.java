package com.polytech.polytech.DTO;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
public class UserAccountDTO {

    private String username;

    private String password;

}
