package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.ArticleRequestDTO;
import com.openclassrooms.mddapi.dto.ArticleResponseDTO;
import com.openclassrooms.mddapi.service.ArticleService;
import lombok.RequiredArgsConstructor;

import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    // récupérer les infos de connexion sans passer dans l'URL l'id de l'user
    // l'objet nommée authentification pour récupérer le contexte
    // regarder s'il y a une nouvelle version

    @PostMapping("/user/{userId}")
    public ResponseEntity<ArticleResponseDTO> createArticle(@PathVariable Long userId,
            @RequestBody ArticleRequestDTO dto, Authentication authentication) {
        authentication.getUsername(); // contexte ici
        System.out.println("username :" + authentication.getUsername());
        return ResponseEntity.ok(articleService.createArticle(userId, dto));
    }

    @PutMapping("/{articleId}/user/{userId}")
    public ResponseEntity<ArticleResponseDTO> updateArticle(@PathVariable Long articleId,
            @PathVariable Long userId,
            @RequestBody ArticleRequestDTO dto) {
        return ResponseEntity.ok(articleService.updateArticle(articleId, dto, userId));
    }

    @DeleteMapping("/{articleId}/user/{userId}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long articleId,
            @PathVariable Long userId) {
        articleService.deleteArticle(articleId, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponseDTO> getArticleById(@PathVariable Long id) {
        return ResponseEntity.ok(articleService.getArticleById(id));
    }

    @GetMapping
    public ResponseEntity<List<ArticleResponseDTO>> getAllArticlesSorted(
            @RequestParam(defaultValue = "newest") String sortOrder) {
        return ResponseEntity.ok(articleService.getAllArticlesSorted(sortOrder));
    }
}
