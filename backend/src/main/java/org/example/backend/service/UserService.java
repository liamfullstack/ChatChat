package org.example.backend.service;

import org.example.backend.dto.*;
import org.example.backend.model.Follower;
import org.example.backend.model.Post;
import org.example.backend.model.User;

import java.util.List;

public interface UserService {

    Integer register(UserRegisterRequest userRegisterRequest);

    User getUserbyId(Integer userId);

    User login(UserLoginRequest userLoginRequest);

    UserResponse findUserFromId(Integer userId);


}
