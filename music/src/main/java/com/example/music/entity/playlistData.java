package com.example.music.entity;

public class playlistData {
    private String songName;
    private String artist;

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

    @Override
    public String toString() {
        return "playlistData{" +
                "songName='" + songName + '\'' +
                ", artist='" + artist + '\'' +
                '}';
    }
}
