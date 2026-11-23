package org.example.backend.controller;

import org.example.backend.dto.StoneRequest;
import org.example.backend.model.Stone;
import org.example.backend.service.StoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StoneController {
    @Autowired
    private StoneService stoneService;

    @PostMapping("/api/stone")
    public ResponseEntity<Stone> makeMileStone(
            @RequestHeader("X-User-Id") Integer userId,
            @RequestBody StoneRequest stoneRequest) {
        Integer stoneId = stoneService.createStone(userId, stoneRequest);
        Stone stone = stoneService.findStoneById(stoneId);
        return ResponseEntity.status(HttpStatus.CREATED).body(stone);
    }

    @GetMapping("/api/stone")
    public ResponseEntity<List<Stone>> getMileStones(
            @RequestHeader("X-User-Id") Integer userId) {
        List<Stone> stones = stoneService.getStones(userId);
        return ResponseEntity.status(HttpStatus.OK).body(stones);
    }

    @GetMapping("/api/stone/{stoneId}")
    public ResponseEntity<Stone> getMileStone(@PathVariable Integer stoneId) {
        Stone stone = stoneService.findStoneById(stoneId);
        if (stone == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(stone);
    }

    @DeleteMapping("/api/stone/{stoneId}")
    public ResponseEntity<Void> deleteMileStone(
            @RequestHeader("X-User-Id") Integer userId,
            @PathVariable Integer stoneId) {
        boolean deleted = stoneService.deleteStone(stoneId, userId);
        if (!deleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
