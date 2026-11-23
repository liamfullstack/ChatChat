package org.example.backend.rowmapper;

import org.example.backend.model.Comment;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CommentRowMapper implements RowMapper<Comment> {
    @Override
    public Comment mapRow(ResultSet rs, int rowNum) throws SQLException {
        Comment comment = new Comment();
        comment.setId(rs.getInt("id"));
        comment.setPostId(rs.getInt("post_id"));
        comment.setUserId(rs.getInt("user_id"));

        // parent_id 可能是 NULL，要用 getObject 才不會把 NULL 變成 0
        Integer parentId = (Integer) rs.getObject("parent_id");
        comment.setParentId(parentId);

        comment.setContent(rs.getString("content"));
        comment.setUsername(rs.getString("username"));
        comment.setCreatedAt(rs.getTimestamp("created_at"));
        return comment;
    }
}