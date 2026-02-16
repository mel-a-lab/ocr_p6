package com.openclassrooms.mddapi.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponseDTO {
    private String token;   // JWT token
    private UserResponseDTO user;
}

