package org.example.backend.rowmapper;

import org.example.backend.dto.FollowingUserResponse;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class FollowingUserRowMapper implements RowMapper<FollowingUserResponse> {
    @Override
    public FollowingUserResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
        FollowingUserResponse user = new FollowingUserResponse();
        user.setId(rs.getInt("id"));
        user.setUsername(rs.getString("username"));
        user.setAvatarUrl(rs.getString("avatar_url"));
        return user;
    }
}