package com.fzu.test;

import com.fzu.edu.dao.UserinfoMapper;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.Reader;

/**
 * Created by Mr yu on 2017-07-06.
 */
public class Test {
    private static SqlSessionFactory sqlSessionFactory;
    private static Reader reader;

    static{
        try{
            reader    = Resources.getResourceAsReader("config/SqlMapConfig.xml");
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    public static SqlSessionFactory getSession(){
        return sqlSessionFactory;
    }

    /**
     *
     *author: lee by 2017年6月20日
     *description：mybatis插入用户数据
     *@param
     *@return void
     */
    public static void testAdd() {
        SqlSession sqlSession = sqlSessionFactory.openSession();
        try {
            UserinfoMapper userinfoMapper = sqlSession.getMapper(UserinfoMapper.class);
            sqlSession.commit();// 这里一定要提交，不然数据进不去数据库中
        } finally {
            sqlSession.close();
        }
    }

    public static void testSelect(){
        SqlSession sqlSession = sqlSessionFactory.openSession();
        try {
            /*UserinfoMapper userinfoMapper = sqlSession.getMapper(UserinfoMapper.class);
            List list = userinfoMapper.selectAllUser("","",2);
            System.out.println("查询结果：" + list);*/
        } finally {
            sqlSession.close();
        }
    }


    public static void main(String[] args) {
        testSelect();
    }
}
