package com.example.music.entity;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Base64;

public class Base64Change {
    public static void main(String[] args) {
        String filePath = "D:\\design\\data\\Irises\\15.mp3"; // 替换为你的MP3文件路径
        String base64String = encodeFileToBase64(new File(filePath));
        System.out.println(base64String);
    }

    public static String encodeFileToBase64(File file) {
        try (FileInputStream fileInputStream = new FileInputStream(file)) {
            byte[] fileBytes = new byte[(int) file.length()];
            fileInputStream.read(fileBytes);
            return Base64.getEncoder().encodeToString(fileBytes);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
