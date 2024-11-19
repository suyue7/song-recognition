package com.example.music.Controller;

import com.example.music.Mapper.SearchSong;
import com.example.music.entity.Record;
import com.example.music.entity.songData;
import com.example.music.entity.songInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.Base64;

@RestController
public class TestFileController {
    @Autowired
    private SearchSong searchSong;

    @Value("C:/song/lyrics/") // 服务器获取配置文件中的指定位置
    // @Value("D:\\design\\data\\lyrics\\")  // 本地获取配置文件中的指定位置
    private String dataPath;

    @PostMapping("/testfile")
    public songInfo handleFileUpload(@RequestBody MultipartFile record) {
        long startTime = System.currentTimeMillis();
        songInfo songInfo = new songInfo();
        if (record.isEmpty()) {
            songInfo.setIsUpload(-1);
            songInfo.setIsFind(-1);
            songData song = null;
            songInfo.setSong(song);
            long endTime = System.currentTimeMillis();
            long elapsedTime = endTime - startTime;
            System.out.println("程序运行时间为：" + elapsedTime / 1000.0+ "秒");
            return songInfo;
        }
        try {
            String uploadDir = "C:\\song\\tmp\\"; //服务器文件暂存路径
            // String uploadDir = "D:\\design\\data\\tmp\\"; //本地文件暂存路径
            String path = uploadDir + "tmp.mp3";
            byte[] bytes = record.getBytes();
            File uploadedFile = new File(path);
            record.transferTo(uploadedFile);
//            int index = recordStr.indexOf(',');
//            recordStr = recordStr.substring(index + 1);
//            byte[] decodedBytes = Base64.getDecoder().decode(recordStr);
//            FileOutputStream outputStream = new FileOutputStream(path);
//            outputStream.write(decodedBytes);
//            outputStream.close();
            //调用算法文件
            Process proc;
            try {
                songData song = new songData();
                String[] args=new String[]{"C:\\ProgramData\\Anaconda3\\envs\\song\\python.exe","C:\\song\\version1.4\\detect_function.py",path};  //服务器调用算法文件
                // String[] args=new String[]{"D:\\design\\version1.4\\.venv\\Scripts\\python.exe","D:\\design\\version1.4\\detect_function.py",path};  //本地调用算法文件
                proc = Runtime.getRuntime().exec(args);
                BufferedReader in = new BufferedReader(new InputStreamReader(proc.getInputStream()));
                String line = null;
                String res = new String();
                while ((line = in.readLine()) != null) {
                    res += line;
                    System.out.println(line);
                }
                if(res == "" || Integer.parseInt(res) == -1){
                    songInfo.setIsUpload(1);
                    songInfo.setIsFind(-1);
                    song = null;
                    songInfo.setSong(song);
                    long endTime = System.currentTimeMillis();
                    long elapsedTime = endTime - startTime;
                    System.out.println("程序运行时间为：" + elapsedTime / 1000.0+ "秒");
                    return songInfo;
                }
                String songName = searchSong.getSongName(Integer.parseInt(res));
                System.out.println(songName);
                song = searchSong.getSong(songName);

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
                    System.out.println(str.toString());
                    song.setLyric(str.toString());
                } catch (IOException e) {
                    e.printStackTrace();
                }

                songInfo.setIsUpload(1);
                songInfo.setIsFind(1);
                songInfo.setSong(song);
                in.close();
                proc.waitFor();
            } catch (IOException e) {
                e.printStackTrace();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            //删除临时文件
            // File uploadedFile = new File(path);
            uploadedFile.delete();
            long endTime = System.currentTimeMillis();
            long elapsedTime = endTime - startTime;
            System.out.println("程序运行时间为：" + elapsedTime / 1000.0+ "秒");
            return songInfo;
        } catch (IOException e) {
            e.printStackTrace();
            songInfo.setIsUpload(-1);
            songInfo.setIsFind(-1);
            songData song = null;
            songInfo.setSong(song);
            long endTime = System.currentTimeMillis();
            long elapsedTime = endTime - startTime;
            System.out.println("程序运行时间为：" + elapsedTime / 1000.0+ "秒");
            return songInfo;
        }
    }
}
