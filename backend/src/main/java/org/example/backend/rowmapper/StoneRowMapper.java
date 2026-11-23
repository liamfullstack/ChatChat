package org.example.backend.rowmapper;

import org.example.backend.model.Stone;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class StoneRowMapper implements RowMapper<Stone> {
    @Override
    public Stone mapRow(ResultSet rs, int rowNum) throws SQLException {
        Stone stone = new Stone();
        stone.setId(rs.getInt("id"));
        stone.setUser_id(rs.getInt("user_id"));
        stone.setEvent_time(rs.getTimestamp("event_time"));
        stone.setDescription(rs.getString("description"));
        stone.setCreated_at(rs.getTimestamp("created_at"));
        return stone;
    }
}