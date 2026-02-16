package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.CommentRequestDTO;
import com.openclassrooms.mddapi.dto.CommentResponseDTO;

import java.util.List;

public interface CommentService {
    CommentResponseDTO addComment(Long userId, CommentRequestDTO dto);
    void deleteComment(Long commentId, Long userId);
    List<CommentResponseDTO> getCommentsByArticle(Long articleId);
}

