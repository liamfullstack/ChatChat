package org.example.backend.service;

import org.example.backend.model.Comment;
import org.example.backend.model.CommentNode;

import java.util.List;

public interface CommentService {

    List<CommentNode> getCommentTree(Integer postId);

    List<CommentNode> buildTree(List<Comment> flatComments);

    Integer createComment(Comment comment);
}
