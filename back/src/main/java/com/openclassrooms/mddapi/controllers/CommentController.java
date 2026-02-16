package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.CommentRequestDTO;
import com.openclassrooms.mddapi.dto.CommentResponseDTO;
import com.openclassrooms.mddapi.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/user/{userId}")
    public ResponseEntity<CommentResponseDTO> addComment(@PathVariable Long userId,
                                                         @RequestBody CommentRequestDTO dto) {
        return ResponseEntity.ok(commentService.addComment(userId, dto));
    }

    @DeleteMapping("/{commentId}/user/{userId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId,
                                              @PathVariable Long userId) {
        commentService.deleteComment(commentId, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/article/{articleId}")
    public ResponseEntity<List<CommentResponseDTO>> getCommentsByArticle(@PathVariable Long articleId) {
        return ResponseEntity.ok(commentService.getCommentsByArticle(articleId));
    }
}

