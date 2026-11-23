package org.example.backend.service;

import org.example.backend.dto.FollowingUserResponse;
import org.example.backend.model.Follower;

import java.util.List;

public interface FollowerService {
    void addFollow(Integer followerId, Integer followeeId);

    Follower getFollow(Integer followerId, Integer followeeId);

    Follower deleteFollow(Integer followerId, Integer followeeId);

    List<Follower> getFollowingListByUserId(Integer userId);

    List<FollowingUserResponse> getFollowingUsersDetails(Integer userId);
}
