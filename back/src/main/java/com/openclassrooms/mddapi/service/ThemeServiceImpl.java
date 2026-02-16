// src/main/java/com/openclassrooms/mddapi/service/ThemeServiceImpl.java (FULL CORRECTED VERSION WITH CONSISTENT PARAM NAMES)
package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.ThemeRequestDTO;
import com.openclassrooms.mddapi.dto.ThemeResponseDTO;
import com.openclassrooms.mddapi.entity.Theme;
import com.openclassrooms.mddapi.entity.User;
import com.openclassrooms.mddapi.repo.ThemeRepository;
import com.openclassrooms.mddapi.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ThemeServiceImpl implements ThemeService {

    private final ThemeRepository themeRepository;
    private final UserRepository userRepository;

    @Override
    public ThemeResponseDTO createTheme(ThemeRequestDTO dto) {
        Theme theme = Theme.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .build();
        themeRepository.save(theme);
        return mapToResponse(theme);
    }

    @Override
    public ThemeResponseDTO updateTheme(Long themeId, ThemeRequestDTO dto) {
        Theme theme = themeRepository.findById(themeId)
                .orElseThrow(() -> new RuntimeException("Theme not found"));
        theme.setName(dto.getName());
        theme.setDescription(dto.getDescription());
        return mapToResponse(themeRepository.save(theme));
    }

    @Override
    public void deleteTheme(Long themeId) {
        if (!themeRepository.existsById(themeId)) {
            throw new RuntimeException("Theme not found");
        }
        themeRepository.deleteById(themeId);
    }

    @Override
    public ThemeResponseDTO getThemeById(Long themeId) {
        Theme theme = themeRepository.findById(themeId)
                .orElseThrow(() -> new RuntimeException("Theme not found"));
        Long currentUserId = getCurrentUserId();
        return mapToResponse(theme, currentUserId);
    }

    @Override
    public List<ThemeResponseDTO> getAllThemes() {
        List<Theme> themes = themeRepository.findAll();
        Long currentUserId = getCurrentUserId();
        return themes.stream()
                .map(theme -> mapToResponse(theme, currentUserId))
                .collect(Collectors.toList());
    }

    @Override
    public ThemeResponseDTO subscribeToTheme(Long themeId) {
        Long currentUserId = getCurrentUserId();
        if (currentUserId == null) {
            throw new RuntimeException("User not authenticated");
        }
        Theme theme = themeRepository.findById(themeId)
                .orElseThrow(() -> new RuntimeException("Theme not found"));
        User currentUser = getCurrentUser();

        if (theme.getSubscribers().contains(currentUser)) {
            throw new RuntimeException("Already subscribed");
        }

        theme.getSubscribers().add(currentUser);
        currentUser.getSubscriptions().add(theme);

        themeRepository.save(theme);
        userRepository.save(currentUser);

        return mapToResponse(theme, currentUser.getId());
    }

    @Override
    public ThemeResponseDTO unsubscribeFromTheme(Long themeId) {
        Long currentUserId = getCurrentUserId();
        if (currentUserId == null) {
            throw new RuntimeException("User not authenticated");
        }
        Theme theme = themeRepository.findById(themeId)
                .orElseThrow(() -> new RuntimeException("Theme not found"));
        User currentUser = getCurrentUser();

        if (!theme.getSubscribers().contains(currentUser)) {
            throw new RuntimeException("Not subscribed");
        }

        theme.getSubscribers().remove(currentUser);
        currentUser.getSubscriptions().remove(theme);

        themeRepository.save(theme);
        userRepository.save(currentUser);

        return mapToResponse(theme, currentUser.getId());
    }

    @Override
    public ThemeResponseDTO toggleSubscription(Long themeId) {
        Long currentUserId = getCurrentUserId();
        if (currentUserId == null) {
            throw new RuntimeException("User not authenticated");
        }
        Theme theme = themeRepository.findById(themeId)
                .orElseThrow(() -> new RuntimeException("Theme not found"));
        User currentUser = getCurrentUser();

        boolean isSubscribed = theme.getSubscribers().contains(currentUser);
        if (isSubscribed) {
            return unsubscribeFromTheme(themeId);
        } else {
            return subscribeToTheme(themeId);
        }
    }

    private ThemeResponseDTO mapToResponse(Theme theme) {
        Long currentUserId = getCurrentUserId();
        return mapToResponse(theme, currentUserId);
    }

    private ThemeResponseDTO mapToResponse(Theme theme, Long currentUserId) {
        boolean isSubscribed = false;
        if (currentUserId != null) {
            User currentUser = userRepository.findById(currentUserId).orElse(null);
            if (currentUser != null) {
                isSubscribed = theme.getSubscribers().contains(currentUser);
            }
        }
        return ThemeResponseDTO.builder()
                .id(theme.getId())
                .name(theme.getName())
                .description(theme.getDescription())
                .subscribersCount(theme.getSubscribers().size())
                .isSubscribed(isSubscribed)
                .build();
    }

    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        Object principal = authentication.getPrincipal();
        String username = null;

        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else if (principal instanceof String) {
            username = (String) principal;
        } else if (principal instanceof User) {
            return ((User) principal).getId();
        } else {
            return null;
        }

        if (username != null) {
            User user = userRepository.findByUsernameOrEmail(username, username).orElse(null);
            return user != null ? user.getId() : null;
        }

        return null;
    }

    private User getCurrentUser() {
        Long userId = getCurrentUserId();
        if (userId == null) {
            throw new RuntimeException("User not authenticated");
        }
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Current user not found"));
    }
}