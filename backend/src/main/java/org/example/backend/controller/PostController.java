package org.example.backend.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.example.backend.dto.PostResponse;
import org.example.backend.dto.UserPostRequest;
import org.example.backend.model.Post;
import org.example.backend.service.PostLikeService;
import org.example.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class PostController {

    @Autowired
    private PostLikeService postLikeService;
    @Autowired
    private PostService postService;
    @PostMapping("/api/posts")
    public ResponseEntity<Post> createPost(@RequestBody @Valid  UserPostRequest userPostRequest){
         Integer postId = postService.createPost(userPostRequest);
            Post  post = postService.getPostById(postId);
         return ResponseEntity.status(HttpStatus.CREATED).body(post);
    }
    @PutMapping("/api/posts/{PostId}")
    public ResponseEntity<Post> updatePost(@PathVariable Integer PostId, @RequestBody UserPostRequest userPostRequest){
         Post post_chosen = postService.getPostById(PostId);
         Post post_finished = postService.updatePost(post_chosen, userPostRequest);
         return ResponseEntity.status(HttpStatus.OK).body(post_finished);
    }

    // DELETE /api/posts/{postId}?requestUserId=1
    @DeleteMapping("/api/posts/{postId}")
    public ResponseEntity<?> deletePost(
            @PathVariable Integer postId,
            @RequestParam(required = true) Integer requestUserId) {
        postService.deletePost(postId, requestUserId);
        return ResponseEntity.status(HttpStatus.OK).body("刪除成功");
    }

    @GetMapping("/api/posts")
    public ResponseEntity<?> showPost(@RequestParam(required = false) Integer userId){
        List<PostResponse> posts = postService.getAllPostsbyUser(userId);
        return ResponseEntity.status(HttpStatus.OK).body(posts);
    }
    @PostMapping("/api/posts/{postId}/like")
    public ResponseEntity<Map<String, Boolean>> toggleLike(
            @PathVariable Integer postId,
            @RequestParam Integer userId
    ){

        boolean isLiked = postLikeService.toggleLike(postId, userId);
        return ResponseEntity.status(HttpStatus.OK).body(Map.of("liked",isLiked));
    }

    @GetMapping("/api/posts/{postId}")
    public ResponseEntity<PostResponse> getPost(@PathVariable Integer postId){
        PostResponse post = postService.getPostResponseById(postId);
        return ResponseEntity.status(HttpStatus.OK).body(post);
    }


    @GetMapping("/api/posts/liked")
    public ResponseEntity<List<Integer>> getLikedPostIds(@RequestParam Integer userId) {
        List<Integer> likedPostIds = postLikeService.getLikedPostIds(userId);
        return ResponseEntity.status(HttpStatus.OK).body(likedPostIds);
    }
}
