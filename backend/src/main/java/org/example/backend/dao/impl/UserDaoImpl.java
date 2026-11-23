package org.example.backend.dao.impl;

import org.example.backend.dao.UserDao;
import org.example.backend.dto.UserLoginRequest;
import org.example.backend.dto.UserRegisterRequest;
import org.example.backend.dto.UserResponse;
import org.example.backend.model.User;
import org.example.backend.rowmapper.UserResponseRowMapper;
import org.example.backend.rowmapper.UserRowMapper;
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
public class UserDaoImpl implements UserDao {

    @Override
    public UserResponse findUserFromId(Integer userId) {
        String sql = """
        SELECT
            u.id,
            u.username,
            u.avatar_url,
            u.created_at,
            COUNT(DISTINCT f1.follower_id)  AS follower_count,
            COUNT(DISTINCT f2.following_id) AS following_count,
            COUNT(DISTINCT p.id)            AS post_count
        FROM users u
        LEFT JOIN follows f1 ON f1.following_id = u.id
        LEFT JOIN follows f2 ON f2.follower_id  = u.id
        LEFT JOIN posts p ON p.user_id = u.id
        WHERE u.id = :userId
        GROUP BY u.id, u.username, u.avatar_url, u.created_at
        """;
        MapSqlParameterSource params = new MapSqlParameterSource("userId", userId);
        List<UserResponse> result = namedParameterJdbcTemplate.query(sql, params, new UserResponseRowMapper());
        return result.get(0);
    }

    @Override
    public User getUserbyUsername(String userLoginUsername) {
        String sql = "SELECT id, username, avatar_url, password_hash, created_at, updated_at FROM `users` WHERE username = :userName";

        Map<String, Object> map = new HashMap<>();
        map.put("userName", userLoginUsername);

        List<User> userList = namedParameterJdbcTemplate.query(sql, map, new UserRowMapper());

        if (userList.size() > 0) {
            return userList.get(0);
        } else {
            return null;
        }
    }

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    @Override
    public User getUserbyId(Integer userId) {
        String sql = "SELECT id, username, avatar_url, password_hash, created_at, updated_at" +
                " FROM users WHERE id = :userId";
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);

        List<User> userList = namedParameterJdbcTemplate.query(sql, map, new UserRowMapper());

        if(userList.size() > 0) {
            return (User) userList.get(0);
        }else{
            return null;
        }
    }

    @Override
    public Integer createUser(UserRegisterRequest userRegisterRequest) {
        String sql="INSERT INTO users(username, avatar_url, password_hash, created_at, updated_at)"+
                "VALUES (:username, :avatar_url, :password, :createdDate, :lastModifiedDate)";

        Map<String, Object> map = new HashMap<>();
        map.put("username",userRegisterRequest.getUsername());
        map.put("password", userRegisterRequest.getPassword());
        map.put("avatar_url",userRegisterRequest.getAvatar_url());
        Date now = new Date();
        map.put("createdDate", now);
        map.put("lastModifiedDate",now);

        KeyHolder keyHolder = new GeneratedKeyHolder();

        namedParameterJdbcTemplate.update(sql, new MapSqlParameterSource(map), keyHolder);

        int userId = keyHolder.getKey().intValue();

        return userId;
    }


}
