package com.example.music.Controller;

import com.example.music.Mapper.SearchSong;
import com.example.music.entity.songData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

@RestController
public class GetSongController {
    @Autowired
    private SearchSong searchSong;

    @Value("C:/song/lyrics/") // 服务器获取配置文件中的指定位置
    // @Value("D:\\design\\data\\lyrics\\")  // 本地获取配置文件中的指定位置
    private String dataPath;

    @GetMapping("/song")
    public songData getSong(@RequestParam String songName){
        songData songData = searchSong.getSong(songName);
        //获取歌词
        File file = new File(dataPath + songName + ".txt");
        StringBuilder str = new StringBuilder();
        try{
            BufferedReader reader = new BufferedReader(new FileReader(file));
            String l;
            while((l = reader.readLine()) != null){
                l += "\n";
                str.append(l);
            }
            // System.out.println(str.toString());
            songData.setLyric(str.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return songData;
    }
}
