package org.example.backend.model;

import java.util.Date;

public class Follower {
    private Integer id;
    private  Integer follower_id;
    private  Integer following_id;
    private Integer is_mutual;
    private Date created_at;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getFollower_id() {
        return follower_id;
    }

    public void setFollower_id(Integer follower_id) {
        this.follower_id = follower_id;
    }

    public Integer getFollowing_id() {
        return following_id;
    }

    public void setFollowing_id(Integer following_id) {
        this.following_id = following_id;
    }

    public Integer getIs_mutual() {
        return is_mutual;
    }

    public void setIs_mutual(Integer is_mutual) {
        this.is_mutual = is_mutual;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }
}
