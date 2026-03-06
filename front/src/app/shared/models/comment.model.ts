export interface CommentResponseDTO {
  id: number;
  content: string;
  createdAt: string;   // LocalDateTime → ISO string in JSON
  author: string;
}

export interface CommentRequestDTO {
  content: string;
  articleId: number;
}
