package org.example.backend.dao;

import org.example.backend.dto.FollowingUserResponse;
import org.example.backend.model.Follower;

import java.util.List;

public interface FollowerDao {
    void addFollow(Integer followerId, Integer followeeId);

    Follower getFollow(Integer followerId, Integer followeeId);

    void updateMutual(Integer followerId, Integer followeeId, boolean isMutual);

    void deleteFollow(Integer followerId, Integer followeeId);

    List<Follower> getFollowingByUserId(Integer userId);


    List<FollowingUserResponse> getFollowingUsersDetails(Integer userId);
}
