package org.example.backend.dao.impl;

import org.example.backend.dao.PostLikeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class PostLikeDaoImpl implements PostLikeDao {

    @Autowired
    private  NamedParameterJdbcTemplate jdbc;



    // 檢查這個 user 對這篇貼文是否已經按過讚
    @Override
    public boolean hasLiked(Integer postId, Integer userId) {
        String sql = "SELECT COUNT(*) FROM post_likes WHERE post_id = :postId AND user_id = :userId";

        Map<String, Object> params = new HashMap<>();
        params.put("postId", postId);
        params.put("userId", userId);

        Integer count = jdbc.queryForObject(sql, params, Integer.class);
        return count != null && count > 0;
    }

    // 新增一筆讚
    @Override
    public void addLike(Integer postId, Integer userId) {
        System.out.println("實際寫入的 postId = " + postId);  // ← 加這一行
        System.out.println("實際寫入的 userId = " + userId);

        String sql = "INSERT INTO post_likes (post_id, user_id, created_at) " +
                "VALUES (:postId, :userId, :createdAt)";

        Map<String, Object> params = new HashMap<>();
        params.put("postId", postId);
        params.put("userId", userId);

        Date now = new Date();
        params.put("createdAt", now );

        jdbc.update(sql, params);
    }

    // 取消讚
    @Override
    public void removeLike(Integer postId, Integer userId) {
        String sql = "DELETE FROM post_likes WHERE post_id = :postId AND user_id = :userId";

        Map<String, Object> params = new HashMap<>();
        params.put("postId", postId);
        params.put("userId", userId);

        jdbc.update(sql, params);
    }

    @Override
    public List<Integer> getLikedPostIds(Integer userId) {
        String sql = "SELECT post_id FROM post_likes WHERE user_id = :userId";

        Map<String, Object> params = new HashMap<>();
        params.put("userId", userId);

        return jdbc.queryForList(sql, params, Integer.class);
    }
}
