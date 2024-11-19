package com.example.music.Controller;

import com.example.music.Mapper.AccountMapper;
import com.example.music.entity.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {
    @Autowired
    AccountMapper accountMapper;

    @GetMapping("/login")
    public Answer login(@RequestParam String account, @RequestParam String password){
//        System.out.println(account);
//        System.out.println(password);
        String a = accountMapper.getAccount(account);
        System.out.println(a);
        Answer answer = new Answer();
        if(a == null){
            answer.setAnswer("用户名输入不正确");
            return answer;
        }
        String b = accountMapper.getPassword(account);
        if(!b.equals(password)){
            answer.setAnswer("密码输入不正确");
            return answer;
        }
        answer.setAnswer("登陆成功");
        return answer;
    }
}
