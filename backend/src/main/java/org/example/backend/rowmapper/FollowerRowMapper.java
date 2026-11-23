package org.example.backend.rowmapper;

import org.example.backend.model.Follower;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class FollowerRowMapper implements RowMapper<Follower> {

    @Override
    public Follower mapRow(ResultSet rs, int rowNum) throws SQLException {
        Follower follow = new Follower();
        follow.setId(rs.getInt("id"));
        follow.setFollower_id(rs.getInt("follower_id"));
        follow.setFollowing_id(rs.getInt("following_id"));
        follow.setIs_mutual(rs.getInt("is_mutual"));
        return follow;
    }

}