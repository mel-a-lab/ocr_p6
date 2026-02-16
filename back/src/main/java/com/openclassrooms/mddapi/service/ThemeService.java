// src/main/java/com/openclassrooms/mddapi/service/ThemeService.java
package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.ThemeRequestDTO;
import com.openclassrooms.mddapi.dto.ThemeResponseDTO;

import java.util.List;

public interface ThemeService {
    ThemeResponseDTO createTheme(ThemeRequestDTO dto);
    ThemeResponseDTO updateTheme(Long themeId, ThemeRequestDTO dto);
    void deleteTheme(Long themeId);
    ThemeResponseDTO getThemeById(Long themeId);
    List<ThemeResponseDTO> getAllThemes();

    ThemeResponseDTO subscribeToTheme(Long themeId);
    ThemeResponseDTO unsubscribeFromTheme(Long themeId);
    ThemeResponseDTO toggleSubscription(Long themeId);
}