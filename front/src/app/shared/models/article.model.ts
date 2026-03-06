import { CommentResponseDTO } from './comment.model';

export interface ArticleResponseDTO {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author: string;
  theme: string;
  comments: CommentResponseDTO[];
}

export interface ArticleRequestDTO {
  title: string;
  content: string;
  themeId: number;
}
