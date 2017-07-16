package com.fzu.edu.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.fzu.edu.model.Userinfo;
import com.fzu.edu.service.UserService;
import com.fzu.edu.utils.Page;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Mr yu on 2017-07-06.
 */

@Controller
@RequestMapping(value = "/user",produces = {"application/json;charset=UTF-8"})
public class UserController {

    private Logger log = Logger.getLogger(UserController.class);
    @Resource
    private UserService userService;
    @RequestMapping(value="/showUser", method = RequestMethod.GET)
    @ResponseBody
    public String query(@RequestParam(value = "pageNo") int pageNo,
                        @RequestParam(value = "username",required = false) String username,
                        @RequestParam(value = "userno",required = false) String userno,
                        @RequestParam(value = "companyid",required = false) Integer companyid,
                        @RequestParam(value = "pageSize") int pageSize
    ){
        log.info("查询所有用户信息");
        List<Userinfo> userList = userService.getAllUser(username,userno,companyid);
        Page page = new Page(pageNo,pageSize,userList);
        return JSON.toJSONString(page, SerializerFeature.DisableCircularReferenceDetect);
    }

    @RequestMapping(value = "/addUser",method = RequestMethod.POST)
    @ResponseBody
    public String addUser(
            @RequestParam(value = "username")String username,
            @RequestParam(value = "userno")String userno,
            @RequestParam(value = "sex")Integer sex,
            @RequestParam(value = "age",required = false)Integer age,
            @RequestParam(value = "post",required = false)String post,
            @RequestParam(value = "tel",required = false)String tel,
            @RequestParam(value = "idcard",required = false)String idcard,
            @RequestParam(value = "degrees",required = false)String degrees,
            @RequestParam(value = "describ",required = false)String describ,
            @RequestParam(value = "address",required = false)String address){

        try{
            userService.addUser(username,userno,sex,age,post,tel,idcard,degrees,describ,address);
            return JSON.toJSONString(1);
        }catch (Exception e){
            return JSON.toJSONString(0);
        }
    }

    @RequestMapping(value = "/updateUser",method = RequestMethod.POST)
    @ResponseBody
    public String updateUser(
            @RequestParam(value = "id")Integer id,
            @RequestParam(value = "username")String username,
            @RequestParam(value = "sex")Integer sex,
            @RequestParam(value = "age",required = false)Integer age,
            @RequestParam(value = "post",required = false)String post,
            @RequestParam(value = "tel",required = false)String tel,
            @RequestParam(value = "idcard",required = false)String idcard,
            @RequestParam(value = "degrees",required = false)String degrees,
            @RequestParam(value = "describ",required = false)String describ,
            @RequestParam(value = "address",required = false)String address){

        try{
            userService.updateUser(id,username,sex,age,post,tel,idcard,degrees,describ,address);
            return JSON.toJSONString(1);
        }catch (Exception e){
            return JSON.toJSONString(0);
        }
    }

    @RequestMapping(value = "/delUser",method = RequestMethod.POST)
    @ResponseBody
    public String delUser(
            @RequestParam(value = "id")Integer id
           ){

        try{
            userService.delUser(id);
            return JSON.toJSONString(1);
        }catch (Exception e){
            return JSON.toJSONString(0);
        }
    }

    @RequestMapping(value = "/delUsers",method = RequestMethod.GET)
    @ResponseBody
    public String delUsers(
            @RequestParam(value = "ids")List ids
    ){
        try{
            userService.delUsers(ids);
            return JSON.toJSONString(1);
        }catch (Exception e){
            return JSON.toJSONString(0);
        }
    }

    @RequestMapping(value = "/getUser",method = RequestMethod.POST)
    @ResponseBody
    public String getUser(
            @RequestParam(value = "id")Integer id
    ){

        try{
            Userinfo userinfo = userService.getUserById(id);

            return JSON.toJSONString(userinfo);
        }catch (Exception e){
            return JSON.toJSONString(0);
        }
    }
}
