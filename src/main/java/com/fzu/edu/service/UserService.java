package com.fzu.edu.service;

import com.fzu.edu.model.Userinfo;

import java.util.List;

/**
 * Created by Mr yu on 2017-07-06.
 */
public interface UserService {

    List<Userinfo> getAllUser(String username,String userno,Integer companyid);

    Userinfo getUserById(Integer userId);

    void addUser(String username, String userno, Integer sex, Integer age, String post, String tel, String idcard, String degrees, String describ, String address) throws Exception;

    void updateUser(Integer id,String username,  Integer sex, Integer age, String post, String tel, String idcard, String degrees, String describ, String address);

    void addUserEntity(Userinfo userinfo);

    void delUser(Integer id);

    void delUsers(List ids);


}
