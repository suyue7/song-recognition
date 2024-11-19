package com.example.music.Controller;

import com.example.music.entity.Record;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

//测试前后端文件传递所用
@RestController
public class TestController {

    @PostMapping("/test")
    public String test(@RequestBody Record record){
        String recordStr = record.getRecord();
        System.out.println(recordStr);
        if (recordStr == null){
            System.out.println("null");
            return "null";
        }
        return recordStr;
    }
}
