package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.ArticleRequestDTO;
import com.openclassrooms.mddapi.dto.ArticleResponseDTO;

import java.util.List;

public interface ArticleService {
    ArticleResponseDTO createArticle(Long userId, ArticleRequestDTO dto);
    ArticleResponseDTO updateArticle(Long articleId, ArticleRequestDTO dto, Long userId);
    void deleteArticle(Long articleId, Long userId);
    ArticleResponseDTO getArticleById(Long articleId);
    List<ArticleResponseDTO> getAllArticlesSorted(String sortOrder);
}

