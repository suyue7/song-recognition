package com.example.music.Controller;

import com.example.music.Mapper.SaveMapper;
import com.example.music.Mapper.SearchSong;
import com.example.music.entity.Record;
import com.example.music.entity.songData;
import com.example.music.entity.songInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;

@RestController
public class SongController {
    @Autowired
    private SearchSong searchSong;
    @Autowired
    private SaveMapper saveMapper;

    @Value("C:/song/lyrics/") // 服务器获取配置文件中的指定位置
    // @Value("D:\\design\\data\\lyrics\\")  // 本地获取配置文件中的指定位置
    private String dataPath;

    @PostMapping("/upload")
    public songInfo handleFileUpload(@RequestBody Record record) {
        long startTime = System.currentTimeMillis();
        songInfo songInfo = new songInfo();
        String recordStr = record.getRecord();
        String account = record.getAccount();
        System.out.println(recordStr);
        if (recordStr.equals("")) {
            System.out.println("上传失败");
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
            int index = recordStr.indexOf(',');
            recordStr = recordStr.substring(index + 1);
            byte[] decodedBytes = Base64.getDecoder().decode(recordStr);
            FileOutputStream outputStream = new FileOutputStream(path);
            outputStream.write(decodedBytes);
            outputStream.close();
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
                if(res.equals("") || Integer.parseInt(res) == -1){
                    System.out.println("算法中断或未找到歌曲");
                    songInfo.setIsUpload(1);
                    songInfo.setIsFind(-1);
                    song = null;
                    songInfo.setSong(song);
                    long endTime = System.currentTimeMillis();
                    long elapsedTime = endTime - startTime;
                    System.out.println("程序运行时间为：" + elapsedTime / 1000.0+ "秒");
                    return songInfo;
                }
                // 获取当前时间
                SimpleDateFormat year1 = new SimpleDateFormat("yyyy");
                String y1 = year1.format(new Date());
                SimpleDateFormat month1 = new SimpleDateFormat("MM");
                String m1 = month1.format(new Date());
                SimpleDateFormat day1 = new SimpleDateFormat("dd");
                String d1 = day1.format(new Date());
                String time =  y1 + "/" + m1 + "/" + d1;
                // 获取歌名
                String songName = searchSong.getSongName(Integer.parseInt(res));
                System.out.println(songName);
                song = searchSong.getSong(songName);
                // 存储搜索历史记录
                String diskSrc = song.getDiskSrc();
                String artist = song.getArtist();
                saveMapper.save(0, account, songName, time, diskSrc, artist);

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
                    System.out.println("读取歌词异常");
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
            //File uploadedFile = new File(path);
            //uploadedFile.delete();
            long endTime = System.currentTimeMillis();
            long elapsedTime = endTime - startTime;
            System.out.println("程序运行时间为：" + elapsedTime / 1000.0+ "秒");
            return songInfo;
        } catch (IOException e) {
            System.out.println("上传异常");
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
