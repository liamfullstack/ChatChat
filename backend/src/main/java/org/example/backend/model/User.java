package org.example.backend.model;

import java.util.Date;

public class User {
    private Integer user;
    private String username;
    private String user_url;
    private  String  user_password_hashed;
    private Date created_at;
    private Date updated_at;

    public Integer getUser() {
        return user;
    }

    public void setUser(Integer user) {
        this.user = user;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUser_url() {
        return user_url;
    }

    public void setUser_url(String user_url) {
        this.user_url = user_url;
    }

    public String getUser_password_hashed() {
        return user_password_hashed;
    }

    public void setUser_password_hashed(String user_password_hashed) {
        this.user_password_hashed = user_password_hashed;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public Date getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(Date updated_at) {
        this.updated_at = updated_at;
    }
}
