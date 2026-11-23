package org.example.backend.service.impl;

import org.example.backend.dao.FollowerDao;
import org.example.backend.dto.FollowingUserResponse;
import org.example.backend.model.Follower;
import org.example.backend.service.FollowerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Component
public class FollowerServiceImpl  implements FollowerService {
    @Override
    public Follower getFollow(Integer followerId, Integer followeeId) {
        return followerDao.getFollow(followerId, followeeId);
    }

    @Override
    public List<Follower> getFollowingListByUserId(Integer userId) {
        return followerDao.getFollowingByUserId(userId);
    }

    @Override
    public List<FollowingUserResponse> getFollowingUsersDetails(Integer userId) {
        return followerDao.getFollowingUsersDetails(userId);
    }

    @Autowired
    private FollowerDao followerDao;
    private final static Logger log = LoggerFactory.getLogger(UserServiceImple.class);

    @Override
    public Follower deleteFollow(Integer followerId, Integer followeeId) {

        // 1. 先把資料查出來
        Follower existing = followerDao.getFollow(followerId, followeeId);
        if (existing == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "尚未追蹤");
        }

        // 2. 再刪除
        followerDao.deleteFollow(followerId, followeeId);
        followerDao.updateMutual(followeeId, followerId, false);

        // 3. 回傳剛才查到的資料
        return existing;

    }

    @Override
    public void addFollow(Integer followerId, Integer followeeId) {
        Follower existing = followerDao.getFollow(followerId, followeeId);
        if(existing!= null){
            log.warn("user Id:{} 和 userId: {} 已經互相追蹤過了", followerId, followeeId);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "已經追蹤過了");
        }

        followerDao.addFollow(followerId, followeeId);

        Follower reverse = followerDao.getFollow(followeeId, followerId);
        if(reverse != null){
            followerDao.updateMutual(followerId, followeeId, true);
            followerDao.updateMutual(followeeId, followerId, true);
            log.info("user Id:{} 和 userId: {} 互相追蹤", followerId, followeeId);
        }
    }
}
