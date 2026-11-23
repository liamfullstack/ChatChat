package org.example.backend.dao.impl;

import org.example.backend.dao.PostDao;
import org.example.backend.dto.PostResponse;
import org.example.backend.dto.UserPostRequest;
import org.example.backend.model.Post;
import org.example.backend.rowmapper.PostResponseRowMapper;
import org.example.backend.rowmapper.PostRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class PostDaoImpl implements PostDao {
    @Override
    public List<PostResponse> findPosts(Integer userId) {
        StringBuilder sql = new StringBuilder("""
        SELECT
            p.id,
            p.user_id,
            u.username,
            u.avatar_url,
            p.content,
            p.created_at,
            p.updated_at,
            COUNT(DISTINCT pl.id) AS like_count,
            COUNT(DISTINCT c.id)  AS comment_count
        FROM posts p
        JOIN users u ON u.id = p.user_id
        LEFT JOIN post_likes pl ON pl.post_id = p.id
        LEFT JOIN comments   c  ON c.post_id  = p.id
        WHERE 1=1
        """);

        MapSqlParameterSource params = new MapSqlParameterSource();

        if (userId != null) {
            sql.append(" AND p.user_id = :userId ");
            params.addValue("userId", userId);
        }

        sql.append("""
        GROUP BY p.id, p.user_id, u.username, u.avatar_url, p.content, p.created_at, p.updated_at
        ORDER BY p.created_at DESC
        """);

        return jdbc.query(sql.toString(), params, new PostResponseRowMapper());
    }

    @Autowired
    private NamedParameterJdbcTemplate jdbc;

    @Override
    public Post getPostById(Integer postId) {
        String sql = "SELECT * FROM posts WHERE id = :id";

        List<Post> result = jdbc.query(
                sql,
                new MapSqlParameterSource("id", postId),
                new PostRowMapper()
        );

        return result.stream().findFirst().orElse(null);
    }

    @Override
    public Integer createPost(UserPostRequest userPostRequest) {
        String sql = "INSERT INTO posts (user_id, content, " +
                "created_at, updated_at)" +
                " VALUES (:userId, :postContent, " +
                ":createdAt, :updatedAt) ";
        // 1. 用 Map 包參數
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userPostRequest.getUser_id());
        map.put("postContent", userPostRequest.getContent());
        Date now  = new Date();
        map.put("createdAt",now);
        map.put("updatedAt", now);

        // 2. 建立 KeyHolder
        KeyHolder keyHolder = new GeneratedKeyHolder();

        // 3. 執行，注意第二個參數要用 MapSqlParameterSource(map)
        jdbc.update(sql, new MapSqlParameterSource(map), keyHolder);

        // 4. 取得剛剛插入的 id
        Integer newPostId = keyHolder.getKey().intValue();

        // 5. 用 id 查回完整的 Post 回傳（或自己組裝）
        return newPostId;

    }

    @Override
    public Integer updatePost(Post post_chosen, UserPostRequest userPostRequest) {
        String sql = """
            UPDATE posts
            SET content = :content, updated_at = :updateAt
            WHERE id = :id
            """;

        Date now = new Date();

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("content", userPostRequest.getContent())
                .addValue("updateAt", now)
                .addValue("id", post_chosen.getId());
        return jdbc.update(sql, params);
    }

    public void deletePost(Integer postId) {
        String sql = "DELETE FROM posts WHERE id = :id";

        jdbc.update(sql, new MapSqlParameterSource("id", postId));
    }

    @Override
    public PostResponse getPostResponse(Integer postId) {
        StringBuilder sql = new StringBuilder("""
        SELECT
            p.id,
            p.user_id,
            u.username,
            u.avatar_url,
            p.content,
            p.created_at,
            p.updated_at,
            COUNT(DISTINCT pl.id) AS like_count,
            COUNT(DISTINCT c.id)  AS comment_count
        FROM posts p
        JOIN users u ON u.id = p.user_id
        LEFT JOIN post_likes pl ON pl.post_id = p.id
        LEFT JOIN comments   c  ON c.post_id  = p.id
        WHERE p.id = :postId
        GROUP BY p.id, p.user_id, u.username, u.avatar_url, p.content, p.created_at, p.updated_at
        """);

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("postId", postId);

        return jdbc.queryForObject(sql.toString(), params, new PostResponseRowMapper());
    }
}
