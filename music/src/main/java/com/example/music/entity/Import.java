package com.example.music.entity;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

//用于将歌曲指纹信息导入数据库，非必要，可直接运行算法
public class Import {
    public static void main(String[] args) {
        String path = "D:\\design\\data\\sum";
        Process proc;
        try {
            String[] command=new String[]{"D:\\anaconda\\anaconda3\\python.exe","C:\\Users\\yeron\\Desktop\\version1.4\\save_function.py",path};
            proc = Runtime.getRuntime().exec(command);
            BufferedReader in = new BufferedReader(new InputStreamReader(proc.getInputStream()));
            String line = null;
            while ((line = in.readLine()) != null) {
                System.out.println(line);
            }
            in.close();
            proc.waitFor();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
