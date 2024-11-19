package com.example.music.Controller;

import com.example.music.Mapper.SaveMapper;
import com.example.music.entity.playlistData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
public class PlayListController {
    @Autowired
    private SaveMapper saveMapper;

    @GetMapping("/playlist")
    public List<playlistData> getPlayList(@RequestParam String account){
        List<String> list = saveMapper.getName(account);
        // System.out.println(list);
        Set<String> set = new HashSet<>(list);
        // System.out.println(set);
        List<playlistData> playList = new ArrayList<>();
        for (String s : set) {
            playList.add(saveMapper.getPlaylist(s));
        }
        return playList;
    }
}
