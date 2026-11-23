package org.example.backend.dao;

import org.example.backend.dto.StoneRequest;
import org.example.backend.model.Stone;

import java.util.List;

public interface StoneDao {
    Integer createStone(Integer userId, StoneRequest stoneRequest);
    Stone findStoneById(Integer stoneId);
    List<Stone> findStonesByUserId(Integer userId);
    int deleteStoneByIdAndUserId(Integer stoneId, Integer userId);
}