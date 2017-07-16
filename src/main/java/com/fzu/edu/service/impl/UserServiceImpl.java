package com.fzu.edu.service.impl;

import com.fzu.edu.dao.UserinfoMapper;
import com.fzu.edu.model.Userinfo;
import com.fzu.edu.service.UserService;
import com.fzu.edu.utils.MD5Util;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Mr yu on 2017-07-06.
 */

@Service("userService")
@Transactional(rollbackFor = Exception.class)
public class UserServiceImpl implements UserService {
    
    @Resource
    private UserinfoMapper userinfoMapper;

    public List<Userinfo> getAllUser(String username, String userno, Integer companyid) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("username",username);
        params.put("userno",userno);
        params.put("companyid",companyid);
        return userinfoMapper.selectAllUser(params);
    }
    public Userinfo getUserById(Integer userId) {
        return userinfoMapper.selectByPrimaryKey(userId);
    }

    public void updateUser(Integer id,String username, Integer sex, Integer age, String post, String tel, String idcard, String degrees, String describ, String address) {
        Userinfo userinfo = new Userinfo();
        userinfo.setId(id);
        userinfo.setUsername(username);
        userinfo.setSex(sex);
        userinfo.setAge(age);
        userinfo.setPost(post);
        userinfo.setTel(tel);
        userinfo.setIdcard(idcard);
        userinfo.setDegrees(degrees);
        userinfo.setDescrib(describ);
        userinfo.setAddress(address);
        userinfoMapper.updateByPrimaryKeySelective(userinfo);

    }
    public void addUser(String username, String userno, Integer sex, Integer age, String post, String tel, String idcard, String degrees, String describ, String address) throws Exception {
        Userinfo userinfo = new Userinfo();
        userinfo.setUsername(username);
        userinfo.setUserno(userno);
        userinfo.setSex(sex);
        userinfo.setAge(age);
        userinfo.setPost(post);
        userinfo.setTel(tel);
        userinfo.setIdcard(idcard);
        userinfo.setDegrees(degrees);
        userinfo.setDescrib(describ);
        userinfo.setAddress(address);
        userinfo.setIsdelete(0);
        String password = "";
        password = MD5Util.md5Encrypt("123456");
        userinfo.setPassword(password);
        userinfoMapper.insertSelective(userinfo);
    }

    public void addUserEntity(Userinfo userinfo){
        userinfoMapper.insertSelective(userinfo);
    }

    public void delUser(Integer id) {
        Userinfo userinfo = new Userinfo();
        userinfo.setId(id);
        userinfo.setIsdelete(1);
        userinfoMapper.updateByPrimaryKeySelective(userinfo);
    }

    public void delUsers(List ids) {
        userinfoMapper.delUsers(ids);
    }

}
