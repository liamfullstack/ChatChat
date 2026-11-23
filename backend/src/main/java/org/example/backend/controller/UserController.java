package org.example.backend.controller;

import jakarta.validation.Valid;
import org.example.backend.dto.UserLoginRequest;
import org.example.backend.dto.UserRegisterRequest;
import org.example.backend.dto.UserResponse;
import org.example.backend.model.User;
import org.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/")
public class UserController {
    @Autowired
 private UserService userService;

    @PostMapping("/users/register")
    public ResponseEntity<User> register(@RequestBody @Valid UserRegisterRequest userRegisterRequest){
        Integer userId = userService.register(userRegisterRequest);

        User user = userService.getUserbyId(userId);

        return ResponseEntity.status(HttpStatus.CREATED).body(user);

    }
    @PostMapping("/users/login")
    public ResponseEntity<User> login(@RequestBody @Valid UserLoginRequest request){
         User user = userService.login(request);
         return ResponseEntity.status(HttpStatus.OK).body(user);

    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Integer userId){
        return ResponseEntity.status(HttpStatus.OK).body(userService.findUserFromId(userId));
    }



}
