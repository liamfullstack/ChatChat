package org.example.backend.service.impl;

import org.example.backend.dao.PostDao;
import org.example.backend.dto.PostResponse;
import org.example.backend.dto.UserPostRequest;
import org.example.backend.model.Post;
import org.example.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Component
public class PostServiceImpl implements PostService {
    @Override
    public PostResponse getPostResponseById(Integer postId) {
        return postDao.getPostResponse(postId);
    }

    @Override
    public void deletePost(Integer postId, Integer requestUserId) {
        Post post = postDao.getPostById(postId);
        if(post==null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "此貼文不存在");
        }

        // 只能刪自己的貼文
        if (!post.getUser_id().equals(requestUserId)) {
            throw new RuntimeException("無權限刪除此貼文");
        }
        postDao.deletePost(postId);
    }

    @Override
    public List<PostResponse> getAllPostsbyUser(Integer userId) {
        return postDao.findPosts(userId);
    }

    @Autowired
    private PostDao postDao;

    @Override
    public Post updatePost(Post post_chosen, UserPostRequest userPostRequest) {
        if(!post_chosen.getUser_id().equals(userPostRequest.getUser_id())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "無權刪改此貼文");
        }
        Integer postId = postDao.updatePost(post_chosen, userPostRequest);

        Post post = postDao.getPostById(postId);
        return post;
    }

    @Override
    public Integer createPost(UserPostRequest userPostRequest) {
        Integer post = postDao.createPost(userPostRequest);
        return  post;
    }

    @Override
    public Post getPostById(Integer postId) {
        Post post = postDao.getPostById(postId);

        if (post == null) {
            throw new RuntimeException("找不到此貼文");
        }

        return post;
    }
}
