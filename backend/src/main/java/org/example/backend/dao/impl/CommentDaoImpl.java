package org.example.backend.dao.impl;

import org.example.backend.dao.CommentDao;
import org.example.backend.model.Comment;
import org.example.backend.rowmapper.CommentRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class CommentDaoImpl implements CommentDao {

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<Comment> findCommentsByPostId(Integer postId) {
        String sql = """
            SELECT c.id, c.post_id, c.user_id, c.parent_id, c.content, c.created_at,
                   u.username
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.post_id = :postId
            ORDER BY c.created_at ASC
            """;

        Map<String, Object> params = new HashMap<>();
        params.put("postId", postId);

        return namedParameterJdbcTemplate.query(sql, params, new CommentRowMapper());
    }

    public Integer insertComment(Comment comment) {
        String sql = """
            INSERT INTO comments (post_id, user_id, parent_id, content, created_at, updated_at)
            VALUES (:postId, :userId, :parentId, :content, NOW(), NOW())
            """;

        Map<String, Object> params = new HashMap<>();
        params.put("postId", comment.getPostId());
        params.put("userId", comment.getUserId());
        params.put("parentId", comment.getParentId()); // 可以是 null，沒關係
        params.put("content", comment.getContent());

        KeyHolder keyHolder = new GeneratedKeyHolder();
        namedParameterJdbcTemplate.update(sql, new MapSqlParameterSource(params), keyHolder);

        return keyHolder.getKey().intValue();
    }


}
