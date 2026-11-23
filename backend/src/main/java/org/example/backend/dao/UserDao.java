package org.example.backend.dao;


import org.example.backend.dto.UserLoginRequest;
import org.example.backend.dto.UserRegisterRequest;
import org.example.backend.dto.UserResponse;
import org.example.backend.model.User;

public interface UserDao {
    Integer createUser(UserRegisterRequest userRegisterRequest);

    User getUserbyId(Integer userId);

    User getUserbyUsername(String userLoginUsername);

    UserResponse findUserFromId(Integer userId);
}
