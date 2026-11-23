package org.example.backend.model;

import java.util.ArrayList;
import java.util.List;

public class CommentNode {
    private Comment comment;
    private List<CommentNode> children = new ArrayList<>();

    public CommentNode(Comment comment) {
        this.comment = comment;
    }

    public Comment getComment() { return comment; }
    public void setComment(Comment comment) { this.comment = comment; }

    public List<CommentNode> getChildren() { return children; }
    public void setChildren(List<CommentNode> children) { this.children = children; }
}
