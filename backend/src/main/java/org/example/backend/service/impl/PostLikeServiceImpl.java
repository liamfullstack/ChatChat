package org.example.backend.service.impl;

import org.example.backend.dao.PostDao;
import org.example.backend.dao.PostLikeDao;
import org.example.backend.service.PostLikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class PostLikeServiceImpl implements PostLikeService {

    @Autowired
    private PostLikeDao postLikeDao;
    @Autowired
    private PostDao postDao;


    @Override
    public List<Integer> getLikedPostIds(Integer userId) {
        return postLikeDao.getLikedPostIds(userId);
    }

    @Override
    @Transactional
    public boolean toggleLike(Integer postId, Integer userId) {
        boolean alreadyLiked = postLikeDao.hasLiked(postId, userId);

        if (alreadyLiked) {
            postLikeDao.removeLike(postId, userId);

            return false; // 回傳「現在是未讚狀態」
        } else {
            postLikeDao.addLike(postId, userId);

            return true; // 回傳「現在是已讚狀態」
        }
    }
}
