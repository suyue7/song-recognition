package com.example.music.entity;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;

//用于测试调用算法代码，实际运行时使用不到
public class test {
    public static void main(String[] args) {
        Process proc;
        try {
        	/*
			附加：
			String[] args1=new String[]{"/home/huan/anaconda2/bin/python","/home/huan/myfile/pythonfile/helloword.py"};
            Process pr=Runtime.getRuntime().exec(args1);
			String数组里的那一行很重要
			首先一定要设置好你所使用的python的位置，切记不要直接使用python，因为系统会默认使用自带的python，所以一定要设置好你所使用的python的位置，否则可能会出现意想不到的问题（比如说我使用的是anaconda中的python，而ubuntu系统会默认调用自带的python，而我自带的python中并没有numpy库，所以会造成相应的代码不会执行的问题，所以设置好python的位置是很重要的）。还有就是要设置好py文件的位置，使用绝对路径。在这里插入代码片

       还有就是可以看出，此方法可以满足我们python代码中调用第三方库的情况，简单实用。
			*/
            String base64 = new String();
            try {
                FileReader fileReader = new FileReader("C:\\Users\\yeron\\Desktop\\test2.txt");
                BufferedReader bufferedReader = new BufferedReader(fileReader);

                String line;
                while ((line = bufferedReader.readLine()) != null) {
                    base64 += line;
                }

                bufferedReader.close();
                fileReader.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            int index = base64.indexOf(',');
            System.out.println(index);
            base64 = base64.substring(index + 1);
            byte[] decodedBytes = Base64.getDecoder().decode(base64);
            FileOutputStream outputStream = new FileOutputStream("D:\\design\\data\\test.mp3");
            outputStream.write(decodedBytes);
            outputStream.close();
//            String[] command=new String[]{"D:\\design\\version1.4\\.venv\\Scripts\\python.exe","D:\\design\\version1.4\\detect_function.py","C:\\Users\\yeron\\Desktop\\ttt.m4a"};
//            proc = Runtime.getRuntime().exec(command);
//            BufferedReader in = new BufferedReader(new InputStreamReader(proc.getInputStream()));
//            String res = new String();
//            System.out.println(res);
//            String line = null;
//            while ((line = in.readLine()) != null) {
//                System.out.println(line);
//            }
//            in.close();
//            proc.waitFor();
        } catch (IOException e) {
            e.printStackTrace();
        }
        SimpleDateFormat year1 = new SimpleDateFormat("yyyy");
        String y1 = year1.format(new Date());
        SimpleDateFormat month1 = new SimpleDateFormat("MM");
        String m1 = month1.format(new Date());
        SimpleDateFormat day1 = new SimpleDateFormat("dd");
        String d1 = day1.format(new Date());
        SimpleDateFormat hour1 = new SimpleDateFormat("HH");
        String h1 = hour1.format(new Date());
        SimpleDateFormat minute1 = new SimpleDateFormat("mm");
        String m2 = minute1.format(new Date());
        SimpleDateFormat second1 = new SimpleDateFormat("ss");
        String s1 = second1.format(new Date());
        System.out.println(y1 + m1 + d1);
    }
}
