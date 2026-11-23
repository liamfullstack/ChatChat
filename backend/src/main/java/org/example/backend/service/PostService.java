package org.example.backend.service;

import org.example.backend.dto.PostResponse;
import org.example.backend.dto.UserPostRequest;
import org.example.backend.model.Post;

import java.util.List;

public interface PostService {
    public Integer createPost(UserPostRequest userPostRequest);

    Post getPostById(Integer postId);

    Post updatePost(Post post_chosen, UserPostRequest userPostRequest);

    void deletePost(Integer postId, Integer requestUserId);

    List<PostResponse> getAllPostsbyUser(Integer userId);

    PostResponse getPostResponseById(Integer postId);
}
