package org.example.backend.dao.impl;

import org.example.backend.dao.StoneDao;
import org.example.backend.dto.StoneRequest;
import org.example.backend.model.Stone;
import org.example.backend.rowmapper.StoneRowMapper;
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
public class StoneDaoImpl implements StoneDao {

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;


    @Override
    public Integer createStone(Integer userId, StoneRequest stoneRequest) {
        String sql = "INSERT INTO user_timelines (user_id, event_time, description, created_at) " +
                "VALUES (:userId, :eventTime, :description, :createdAt)";

        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);
        map.put("eventTime", stoneRequest.getEvent_time());
        map.put("description", stoneRequest.getDescription());
        map.put("createdAt", new Date());

        KeyHolder keyHolder = new GeneratedKeyHolder();
        namedParameterJdbcTemplate.update(sql, new MapSqlParameterSource(map), keyHolder);

        return keyHolder.getKey().intValue();
    }

    @Override
    public Stone findStoneById(Integer stoneId) {
        String sql = "SELECT id, user_id, event_time, description, created_at " +
                "FROM user_timelines WHERE id = :stoneId";

        Map<String, Object> map = new HashMap<>();
        map.put("stoneId", stoneId);

        List<Stone> stoneList = namedParameterJdbcTemplate.query(sql, map, new StoneRowMapper());
        return stoneList.isEmpty() ? null : stoneList.get(0);
    }

    @Override
    public List<Stone> findStonesByUserId(Integer userId) {
        String sql = "SELECT id, user_id, event_time, description, created_at " +
                "FROM user_timelines WHERE user_id = :userId ORDER BY event_time DESC";

        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);

        return namedParameterJdbcTemplate.query(sql, map, new StoneRowMapper());
    }

    @Override
    public int deleteStoneByIdAndUserId(Integer stoneId, Integer userId) {
        String sql = "DELETE FROM user_timelines WHERE id = :stoneId AND user_id = :userId";

        Map<String, Object> map = new HashMap<>();
        map.put("stoneId", stoneId);
        map.put("userId", userId);

        return namedParameterJdbcTemplate.update(sql, map);
    }
}
