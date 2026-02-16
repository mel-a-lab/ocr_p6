// src/main/java/com/openclassrooms/mddapi/controller/ThemeController.java
package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.ThemeRequestDTO;
import com.openclassrooms.mddapi.dto.ThemeResponseDTO;
import com.openclassrooms.mddapi.service.ThemeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/themes")
@RequiredArgsConstructor
public class ThemeController {

    private final ThemeService themeService;

    @PostMapping
    public ResponseEntity<ThemeResponseDTO> createTheme(@RequestBody ThemeRequestDTO dto) {
        return ResponseEntity.ok(themeService.createTheme(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ThemeResponseDTO> updateTheme(@PathVariable Long id,
                                                        @RequestBody ThemeRequestDTO dto) {
        return ResponseEntity.ok(themeService.updateTheme(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTheme(@PathVariable Long id) {
        themeService.deleteTheme(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ThemeResponseDTO> getThemeById(@PathVariable Long id) {
        return ResponseEntity.ok(themeService.getThemeById(id));
    }

    @GetMapping
    public ResponseEntity<List<ThemeResponseDTO>> getAllThemes() {
        return ResponseEntity.ok(themeService.getAllThemes());
    }


    @PostMapping("/{id}/subscribe")
    public ResponseEntity<ThemeResponseDTO> subscribe(@PathVariable Long id) {
        return ResponseEntity.ok(themeService.subscribeToTheme(id));
    }

    @DeleteMapping("/{id}/subscribe")
    public ResponseEntity<ThemeResponseDTO> unsubscribe(@PathVariable Long id) {
        return ResponseEntity.ok(themeService.unsubscribeFromTheme(id));
    }

    @PostMapping("/{id}/toggle-subscription")
    public ResponseEntity<ThemeResponseDTO> toggleSubscription(@PathVariable Long id) {
        return ResponseEntity.ok(themeService.toggleSubscription(id));
    }
}