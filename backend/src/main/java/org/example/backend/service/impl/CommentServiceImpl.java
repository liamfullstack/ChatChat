package org.example.backend.service.impl;

import org.example.backend.dao.CommentDao;
import org.example.backend.model.Comment;
import org.example.backend.model.CommentNode;
import org.example.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentDao commentDao;

    public List<CommentNode> getCommentTree(Integer postId) {
        List<Comment> flatComments = commentDao.findCommentsByPostId(postId);
        return buildTree(flatComments);
    }

    public List<CommentNode> buildTree(List<Comment> flatComments) {
        Map<Integer, CommentNode> nodeMap = new HashMap<>();
        List<CommentNode> rootComments = new ArrayList<>();

        // 第一輪：每筆留言包成 CommentNode，放進 Map 方便之後查找
        for (Comment comment : flatComments) {
            nodeMap.put(comment.getId(), new CommentNode(comment));
        }

        // 第二輪：依照 parent_id 把節點掛到正確位置
        for (Comment comment : flatComments) {
            CommentNode node = nodeMap.get(comment.getId());

            if (comment.getParentId() == null) {
                rootComments.add(node);
            } else {
                CommentNode parentNode = nodeMap.get(comment.getParentId());
                if (parentNode != null) {
                    parentNode.getChildren().add(node);
                }
            }
        }

        return rootComments;
    }

    public Integer createComment(Comment comment) {
        return commentDao.insertComment(comment);
    }

}
