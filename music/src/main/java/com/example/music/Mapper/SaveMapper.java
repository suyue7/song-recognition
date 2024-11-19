package com.example.music.Mapper;

import com.example.music.entity.SongRecord;
import com.example.music.entity.playlistData;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface SaveMapper {
    @Insert("insert into history values(#{id},#{account},#{songName},#{searchTime},#{DiskSrc},#{artist})")
    public void save(int id, String account, String songName, String searchTime, String DiskSrc, String artist);
    @Select("select * from history where account=#{account}")
    public List<SongRecord> getHistory(String account);
    @Select("select songName from history where account=#{account}")
    public List<String> getName(String account);
    @Select("select songName,artist from songdata where songName=#{songName}")
    public playlistData getPlaylist(String songName);
}
