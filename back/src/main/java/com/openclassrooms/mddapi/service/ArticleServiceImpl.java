package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.ArticleRequestDTO;
import com.openclassrooms.mddapi.dto.ArticleResponseDTO;
import com.openclassrooms.mddapi.dto.CommentResponseDTO;
import com.openclassrooms.mddapi.entity.Article;
import com.openclassrooms.mddapi.entity.Theme;
import com.openclassrooms.mddapi.entity.User;
import com.openclassrooms.mddapi.repo.ArticleRepository;
import com.openclassrooms.mddapi.repo.ThemeRepository;
import com.openclassrooms.mddapi.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final ThemeRepository themeRepository;
    private final UserRepository userRepository;

    @Override
    public ArticleResponseDTO createArticle(ArticleRequestDTO dto, String username) {
        User author = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        Theme theme = themeRepository.findById(dto.getThemeId())
                .orElseThrow(() -> new RuntimeException("Thème introuvable"));

        Article article = Article.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .theme(theme)
                .author(author)
                .build();

        Article savedArticle = articleRepository.save(article);
        return mapToResponse(savedArticle);
    }

    @Override
    public ArticleResponseDTO updateArticle(Long articleId, ArticleRequestDTO dto, Long userId) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new RuntimeException("Article not found"));

        if (!article.getAuthor().getId().equals(userId)) {
            throw new RuntimeException("You are not allowed to update this article");
        }

        article.setTitle(dto.getTitle());
        article.setContent(dto.getContent());

        Theme theme = themeRepository.findById(dto.getThemeId())
                .orElseThrow(() -> new RuntimeException("Theme not found"));
        article.setTheme(theme);

        return mapToResponse(articleRepository.save(article));
    }

    @Override
    public void deleteArticle(Long articleId, Long userId) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new RuntimeException("Article not found"));

        if (!article.getAuthor().getId().equals(userId)) {
            throw new RuntimeException("You are not allowed to delete this article");
        }

        articleRepository.delete(article);
    }

    @Override
    public ArticleResponseDTO getArticleById(Long articleId) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new RuntimeException("Article not found"));
        return mapToResponse(article);
    }

    @Override
    public List<ArticleResponseDTO> getAllArticlesSorted(String sortOrder) {
        List<Article> articles = articleRepository.findAll();

        if ("oldest".equalsIgnoreCase(sortOrder)) {
            articles.sort(Comparator.comparing(Article::getCreatedAt));
        } else {
            articles.sort(Comparator.comparing(Article::getCreatedAt).reversed());
        }

        return articles.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private ArticleResponseDTO mapToResponse(Article article) {
        return ArticleResponseDTO.builder()
                .id(article.getId())
                .title(article.getTitle())
                .content(article.getContent())
                .createdAt(article.getCreatedAt())
                .author(article.getAuthor() != null ? article.getAuthor().getUsername() : null)
                .theme(article.getTheme() != null ? article.getTheme().getName() : null)
                .comments(article.getComments() != null
                        ? article.getComments().stream()
                        .filter(comment -> comment != null)
                        .map(comment -> CommentResponseDTO.builder()
                                .id(comment.getId())
                                .content(comment.getContent())
                                .createdAt(comment.getCreatedAt())
                                .author(comment.getAuthor() != null ? comment.getAuthor().getUsername() : null)
                                .build())
                        .collect(Collectors.toList())
                        : List.of())
                .build();
    }
}