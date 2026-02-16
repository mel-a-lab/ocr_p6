package com.openclassrooms.mddapi.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequestDTO {
    private String email;
    private String username;
    private String password;
}

