package com.fzu.test;

/**
 * Created by Mr yu on 2017-07-13.
 */

import com.fzu.edu.model.Userinfo;
import com.fzu.edu.service.UserService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;


public
class TestUser {

    private UserService userService;

    @Before
    public void before(){
        @SuppressWarnings("resource")
        ApplicationContext context =
                new ClassPathXmlApplicationContext(new String[]{"classpath:spring-mvc.xml"
                        ,"classpath:spring-mybatis.xml"});
        userService = (UserService) context.getBean("userService");
    }

    @Test
    public void addUser(){
        Userinfo user = new Userinfo();
        user.setUsername("你好");
        user.setAge(2);
        userService.addUserEntity(user);
        System.out.println(1);
    }
}
