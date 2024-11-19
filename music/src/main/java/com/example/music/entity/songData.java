package com.example.music.entity;

public class songData {
     private String songName;
     private String artist;
     private String songSrc;
     private String diskSrc;
     private String lyric;

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

    public String getSongSrc() {
        return songSrc;
    }

    public void setSongSrc(String songSrc) {
        this.songSrc = songSrc;
    }

    public String getDiskSrc() {
        return diskSrc;
    }

    public void setDiskSrc(String diskSrc) {
        this.diskSrc = diskSrc;
    }

    public String getLyric() {
        return lyric;
    }

    public void setLyric(String lyric) {
        this.lyric = lyric;
    }

    @Override
    public String toString() {
        return "songData{" +
                "songName='" + songName + '\'' +
                ", artist='" + artist + '\'' +
                ", songSrc='" + songSrc + '\'' +
                ", diskSrc='" + diskSrc + '\'' +
                ", lyric='" + lyric + '\'' +
                '}';
    }
}
