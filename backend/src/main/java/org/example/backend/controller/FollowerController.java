package org.example.backend.controller;

import jakarta.validation.Valid;
import org.example.backend.dto.FollowingUserResponse;
import org.example.backend.model.Follower;
import org.example.backend.service.FollowerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
public class FollowerController {
    @Autowired
    private FollowerService followerService;

    @PostMapping("/users/{followeeId}/follow")
    public ResponseEntity<?> addFollow(@PathVariable Integer followeeId,
                                       @RequestParam Integer followerId)
    {
        followerService.addFollow(followerId, followeeId);
        Follower follower = followerService.getFollow(followerId, followeeId);
        return ResponseEntity.status(HttpStatus.CREATED).body(follower);
    }

    @DeleteMapping("/users/{followeeId}/follow")
    public ResponseEntity<?> delete(@PathVariable Integer followeeId,
                                    @RequestParam Integer followerId){
        Follower follower = followerService.deleteFollow(followerId, followeeId);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(follower);
    }
    @GetMapping("/users/{userId}/following")
    public ResponseEntity<List<Follower>> getFollowerList(@PathVariable Integer userId){
            List<Follower> followingList = followerService.getFollowingListByUserId(userId);
            return ResponseEntity.status(HttpStatus.OK).body(followingList);
    }
    @GetMapping("/users/{userId}/following-details")
    public ResponseEntity<List<FollowingUserResponse>> getFollowingDetails(@PathVariable Integer userId ){
        List<FollowingUserResponse> followingUserResponsesList = followerService.getFollowingUsersDetails(userId);
        return ResponseEntity.status(HttpStatus.OK).body(followingUserResponsesList);
    }
}
