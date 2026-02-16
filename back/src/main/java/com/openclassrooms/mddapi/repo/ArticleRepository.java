package com.openclassrooms.mddapi.repo;

import com.openclassrooms.mddapi.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
}

