package org.example.backend.rowmapper;


import java.sql.ResultSet;
import java.sql.SQLException;

import org.example.backend.dto.PostResponse;
import org.example.backend.model.Post;
import org.springframework.jdbc.core.RowMapper;

public class PostResponseRowMapper implements RowMapper<PostResponse> {

    @Override
    public PostResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
        PostResponse post = new PostResponse();
        post.setId(rs.getInt("id"));
        post.setUserId(rs.getInt("user_id"));
        post.setUsername(rs.getString("username"));   // ✅ 新增這行
        post.setAvatar_url(rs.getString("avatar_url"));
        post.setContent(rs.getString("content"));
        post.setLikecount(rs.getInt("like_count"));
        post.setCommentCount(rs.getInt("comment_count"));
        post.setCreated_at(rs.getTimestamp("created_at"));
        post.setUpdated_at(rs.getTimestamp("updated_at"));
        return post;
    }
}