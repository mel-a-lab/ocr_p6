package com.openclassrooms.mddapi.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginRequestDTO {
    private String usernameOrEmail;
    private String password;
}

