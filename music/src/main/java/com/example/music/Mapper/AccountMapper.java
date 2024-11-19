package com.example.music.Mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface AccountMapper {
    @Select("select username from account where username = #{username}")
    public String getAccount(String username);

    @Select("select password from account where username = #{username}")
    public String getPassword(String username);
}
