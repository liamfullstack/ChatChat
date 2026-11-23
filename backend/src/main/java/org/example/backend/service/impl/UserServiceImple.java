package org.example.backend.service.impl;

import org.example.backend.dao.UserDao;
import org.example.backend.dto.UserLoginRequest;
import org.example.backend.dto.UserRegisterRequest;
import org.example.backend.dto.UserResponse;
import org.example.backend.model.User;
import org.example.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.DigestUtils;
import org.springframework.web.server.ResponseStatusException;


@Component
public class UserServiceImple implements UserService {

    private final static Logger log = LoggerFactory.getLogger(UserServiceImple.class);

    @Override
    public UserResponse findUserFromId(Integer userId) {
        UserResponse user = userDao.findUserFromId(userId);

        if(user==null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }

        return user;
    }

    @Override
    public Integer register(UserRegisterRequest userRegisterRequest) {
        User user = userDao.getUserbyUsername(userRegisterRequest.getUsername());

        if(user!=null){
            log.warn("Username 已存在: {}", userRegisterRequest.getUsername());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username已存在");
        }

        String hashedPassword = DigestUtils.md5DigestAsHex(userRegisterRequest.getPassword().getBytes());
        userRegisterRequest.setPassword(hashedPassword);
        return userDao.createUser(userRegisterRequest);
    }

    @Override
    public User login(UserLoginRequest userLoginRequest) {
       User user = userDao.getUserbyUsername(userLoginRequest.getUsername());

        if (user == null) {
            log.warn("email 不存在: {}", userLoginRequest.getUsername());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "email 不存在");
        }

        String hashedPassword = DigestUtils.md5DigestAsHex(userLoginRequest.getPassword().getBytes());
        if (!hashedPassword.equals(user.getUser_password_hashed())) {
            log.warn("密碼錯誤, userId: {}", user.getUsername());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "密碼錯誤");
        }
        log.info("登入成功, userId: {}", user.getUsername());
       return user;
    }

    @Override
    public User getUserbyId(Integer userId) {
        return userDao.getUserbyId(userId);
    }



    @Autowired
    private UserDao userDao;

}
