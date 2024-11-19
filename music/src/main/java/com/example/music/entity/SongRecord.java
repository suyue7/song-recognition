package com.example.music.entity;

public class SongRecord {
    private String songName;
    private String artist;
    private String searchTime;
    private String DiskSrc;

    public String getSongName() {
        return songName;
    }

    public void setSongName(String songName) {
        this.songName = songName;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getSearchTime() {
        return searchTime;
    }

    public void setSearchTime(String searchTime) {
        this.searchTime = searchTime;
    }

    public String getDiskSrc() {
        return DiskSrc;
    }

    public void setDiskSrc(String diskSrc) {
        DiskSrc = diskSrc;
    }

    @Override
    public String toString() {
        return "SongRecord{" +
                "songName='" + songName + '\'' +
                ", artist='" + artist + '\'' +
                ", searchTime='" + searchTime + '\'' +
                ", DiskSrc='" + DiskSrc + '\'' +
                '}';
    }
}
