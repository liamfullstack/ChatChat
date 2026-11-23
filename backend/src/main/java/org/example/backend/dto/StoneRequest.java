package org.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class StoneRequest {
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Taipei")
    private Date event_time;
    private String description;
    private Date created_at;

    public Date getEvent_time() {
        return event_time;
    }

    public void setEvent_time(Date event_time) {
        this.event_time = event_time;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }
}