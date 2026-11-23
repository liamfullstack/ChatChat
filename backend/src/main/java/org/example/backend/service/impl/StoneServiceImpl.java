package org.example.backend.service.impl;

import org.example.backend.dao.StoneDao;
import org.example.backend.dto.StoneRequest;
import org.example.backend.model.Stone;
import org.example.backend.service.StoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class StoneServiceImpl implements StoneService {
    @Autowired
    private StoneDao stoneDao;

    @Override
    public Integer createStone(Integer userId, StoneRequest stoneRequest) {
        return stoneDao.createStone(userId, stoneRequest);
    }

    @Override
    public Stone findStoneById(Integer stoneId) {
        return stoneDao.findStoneById(stoneId);
    }

    @Override
    public List<Stone> getStones(Integer userId) {
        return stoneDao.findStonesByUserId(userId);
    }

    @Override
    public boolean deleteStone(Integer stoneId, Integer userId) {
        int affectedRows = stoneDao.deleteStoneByIdAndUserId(stoneId, userId);
        return affectedRows > 0;
    }
}
