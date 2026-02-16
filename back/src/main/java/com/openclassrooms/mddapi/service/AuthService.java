package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.AuthResponseDTO;
import com.openclassrooms.mddapi.dto.LoginRequestDTO;
import com.openclassrooms.mddapi.dto.UserRequestDTO;

public interface AuthService {
    AuthResponseDTO register(UserRequestDTO dto);
    AuthResponseDTO login(LoginRequestDTO dto);
}

