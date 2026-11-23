package org.example.backend.service;

import java.util.List;

public interface PostLikeService {

    boolean toggleLike(Integer Id, Integer userId);

    List<Integer> getLikedPostIds(Integer userId);

}
