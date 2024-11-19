package com.example.music.Mapper;

import com.example.music.entity.songData;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface SearchSong {
    @Select("select name from songs where id=#{id}")
    public String getSongName(int id);
    @Select("select * from songdata where songName=#{name}")
    public songData getSong(String name);
}
