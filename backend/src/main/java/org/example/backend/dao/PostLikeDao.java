package org.example.backend.dao;

import java.util.List;

public interface PostLikeDao {

    boolean hasLiked(Integer postId, Integer userId);
    void addLike(Integer postId, Integer userId);
    void removeLike(Integer postId, Integer userId);

    List<Integer> getLikedPostIds(Integer userId);

}
