package org.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public class UserPostRequest {
    @NotNull
    private Integer user_id;

    @NotBlank
    private String content;
    private Date created_Date;
    private Date updated_Date;

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCreated_Date() {
        return created_Date;
    }

    public void setCreated_Date(Date created_Date) {
        this.created_Date = created_Date;
    }

    public Date getUpdated_Date() {
        return updated_Date;
    }

    public void setUpdated_Date(Date updated_Date) {
        this.updated_Date = updated_Date;
    }
}
