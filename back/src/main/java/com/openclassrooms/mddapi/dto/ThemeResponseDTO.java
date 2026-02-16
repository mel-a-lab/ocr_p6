package com.openclassrooms.mddapi.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ThemeResponseDTO {
    private Long id;
    private String name;
    private String description;
    private int subscribersCount;
    private boolean isSubscribed;
}

