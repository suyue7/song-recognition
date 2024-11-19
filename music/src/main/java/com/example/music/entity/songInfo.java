package com.example.music.entity;

public class songInfo {
    private int isUpload;
    private int isFind;
    private songData song;

    public int getIsUpload() {
        return isUpload;
    }

    public void setIsUpload(int isUpload) {
        this.isUpload = isUpload;
    }

    public int getIsFind() {
        return isFind;
    }

    public void setIsFind(int isFind) {
        this.isFind = isFind;
    }

    public songData getSong() {
        return song;
    }

    public void setSong(songData song) {
        this.song = song;
    }

    @Override
    public String toString() {
        return "songInfo{" +
                "isUpload=" + isUpload +
                ", isFind=" + isFind +
                ", song=" + song +
                '}';
    }
}
