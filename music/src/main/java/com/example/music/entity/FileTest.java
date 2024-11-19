package com.example.music.entity;

import org.springframework.web.multipart.MultipartFile;

public class FileTest {
    MultipartFile record;

    public MultipartFile getRecord() {
        return record;
    }

    public void setRecord(MultipartFile record) {
        this.record = record;
    }

    @Override
    public String toString() {
        return "Record{" +
                "record='" + record + '\'' +
                '}';
    }
}
