package org.example.backend.rowmapper;

import org.example.backend.model.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserRowMapper implements RowMapper<User> {

    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        user.setUser(rs.getInt("id"));
        user.setUsername(rs.getString("username"));
        user.setUser_url(rs.getString("avatar_url"));
        user.setUser_password_hashed(rs.getString("password_hash"));
        user.setCreated_at(rs.getTimestamp("created_at"));
        user.setUpdated_at(rs.getTimestamp("updated_at"));

        return user;
    }
}
