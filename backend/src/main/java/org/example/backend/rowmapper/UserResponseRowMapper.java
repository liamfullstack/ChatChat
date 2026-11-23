package org.example.backend.rowmapper;

import org.example.backend.dto.UserResponse;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserResponseRowMapper implements RowMapper<UserResponse> {

    @Override
    public UserResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
        UserResponse user = new UserResponse();
        user.setId(rs.getLong("id"));
        user.setUsername(rs.getString("username"));
        user.setAvatarUrl(rs.getString("avatar_url"));
        user.setPostCount(rs.getInt("post_count"));
        user.setFollowerCount(rs.getLong("follower_count"));
        user.setFollowingCount(rs.getLong("following_count"));
        user.setCreatedAt(rs.getTimestamp("created_at"));
        return user;
    }
}