package org.example.backend.dao;

import org.example.backend.dto.PostResponse;
import org.example.backend.dto.UserPostRequest;
import org.example.backend.model.Post;

import java.util.List;

public interface PostDao {

    Integer createPost(UserPostRequest userPostRequest);

    Post getPostById(Integer postId);

    Integer updatePost(Post post_chosen, UserPostRequest userPostRequest);

    void deletePost(Integer postId);

    List<PostResponse> findPosts(Integer userId);

    PostResponse getPostResponse(Integer postId);
}
