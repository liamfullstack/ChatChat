package org.example.backend.controller;

import org.example.backend.model.Comment;
import org.example.backend.model.CommentNode;
import org.example.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/api/posts")
@RestController
public class CommentController {

    @Autowired
    private CommentService commentService;

    // GET /api/posts/{postId}/comments
    @GetMapping("/{postId}/comments")
    public List<CommentNode> getComments(@PathVariable Integer postId) {
        return commentService.getCommentTree(postId);
    }

    // POST /api/posts/{postId}/comments
    @PostMapping("/{postId}/comments")
    public Map<String, Integer> createComment(
            @PathVariable Integer postId,
            @RequestBody Comment comment) {

        comment.setPostId(postId);
        comment.setUserId(5); // TODO: 之後改成從登入資訊拿 userId，先 hardcode 跟你其他地方一致

        Integer newId = commentService.createComment(comment);

        Map<String, Integer> result = new HashMap<>();
        result.put("id", newId);
        return result;
    }


}
