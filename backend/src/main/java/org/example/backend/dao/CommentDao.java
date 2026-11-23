package org.example.backend.dao;

import org.example.backend.model.Comment;

import java.util.List;

public interface CommentDao {

    List<Comment> findCommentsByPostId(Integer postId);

    Integer insertComment(Comment comment);
}
