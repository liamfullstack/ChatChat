package org.example.backend.dao.impl;

import org.example.backend.dao.FollowerDao;
import org.example.backend.dto.FollowingUserResponse;
import org.example.backend.model.Follower;
import org.example.backend.rowmapper.FollowerRowMapper;
import org.example.backend.rowmapper.FollowingUserRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class FollowerDaoImpl implements FollowerDao {

    @Override
    public List<Follower> getFollowingByUserId(Integer userId) {
        String sql = """
        SELECT id, follower_id, following_id, is_mutual
        FROM follows
        WHERE follower_id = :userId
        """;

        MapSqlParameterSource params = new MapSqlParameterSource("userId", userId);

        return namedParameterJdbcTemplate.query(sql, params, new FollowerRowMapper());
    }

    @Override
    public List<FollowingUserResponse> getFollowingUsersDetails(Integer userId) {
        String sql = """
            SELECT u.id, u.username, u.avatar_url
            FROM follows f
            JOIN users u ON f.following_id = u.id
            WHERE f.follower_id = :userId
            """;

        MapSqlParameterSource params = new MapSqlParameterSource("userId", userId);

        return namedParameterJdbcTemplate.query(sql, params, new FollowingUserRowMapper());
    }

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public void addFollow(Integer followerId, Integer followeeId) {
        String sql = "INSERT INTO follows (follower_id, following_id) VALUES (:followerId, :followeeId)";
        Map<String, Object> map = new HashMap<>();
        map.put("followerId", followerId);
        map.put("followeeId", followeeId);
        namedParameterJdbcTemplate.update(sql, map);
    }

    public Follower getFollow(Integer followerId, Integer followeeId) {
        String sql = "SELECT id, follower_id, following_id, is_mutual FROM follows " +
                "WHERE follower_id = :followerId AND following_id = :followeeId";
        Map<String, Object> map = new HashMap<>();
        map.put("followerId", followerId);
        System.out.println("FollowerId是"+followerId);
        map.put("followeeId", followeeId);
        System.out.println("FollowingId是"+ followeeId);
        List<Follower> list = namedParameterJdbcTemplate.query(sql, map, new FollowerRowMapper());
        return list.size() > 0 ? list.get(0) : null;
    }

    public void updateMutual(Integer followerId, Integer followeeId, boolean isMutual) {
        String sql = "UPDATE follows SET is_mutual = :isMutual " +
                "WHERE follower_id = :followerId AND following_id = :followeeId";
        Map<String, Object> map = new HashMap<>();
        map.put("followerId", followerId);
        map.put("followeeId", followeeId);
        map.put("isMutual", isMutual ? 1 : 0);
        namedParameterJdbcTemplate.update(sql, map);
    }

    @Override
    public void deleteFollow(Integer followerId, Integer followeeId) {
        String sql = "DELETE FROM follows WHERE follower_id = :followerId AND following_id = :followeeId";

        Map<String, Object> map = new HashMap<>();
        map.put("followerId", followerId);
        map.put("followeeId", followeeId);

        namedParameterJdbcTemplate.update(sql, map);
    }
}
