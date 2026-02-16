package com.openclassrooms.mddapi.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArticleRequestDTO {
    private String title;
    private String content;
    private Long themeId; // selected theme
}

