package org.example.backend.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.example.backend.model.Post;
import org.springframework.jdbc.core.RowMapper;

public class PostRowMapper implements RowMapper<Post> {

    @Override
    public Post mapRow(ResultSet rs, int rowNum) throws SQLException {
        Post post = new Post();
        post.setId(rs.getInt("id"));
        post.setUser_id(rs.getInt("user_id"));
        post.setContent(rs.getString("content"));

        post.setCreated_at(rs.getTimestamp("created_at"));
        post.setUpdated_at(rs.getTimestamp("updated_at"));
        return post;
    }
}