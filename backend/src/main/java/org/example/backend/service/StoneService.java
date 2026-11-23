package org.example.backend.service;

import org.example.backend.dto.StoneRequest;
import org.example.backend.model.Stone;

import java.util.List;

public interface StoneService {
    Integer createStone(Integer userId, StoneRequest stoneRequest);
    Stone findStoneById(Integer stoneId);
    List<Stone> getStones(Integer userId);
    boolean deleteStone(Integer stoneId, Integer userId);
}
