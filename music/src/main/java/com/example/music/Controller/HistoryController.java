package com.example.music.Controller;

import com.example.music.Mapper.SaveMapper;
import com.example.music.entity.SongRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class HistoryController {
    @Autowired
    private SaveMapper saveMapper;

    @GetMapping("/history")
    public List<SongRecord> getHistory(@RequestParam String account){
        List<SongRecord> tmp = saveMapper.getHistory(account);
        List<SongRecord> history = new ArrayList<>();
        for (int i = tmp.size() - 1; i >= 0; i--){
            history.add(tmp.get(i));
        }
        return history;
    }
}
