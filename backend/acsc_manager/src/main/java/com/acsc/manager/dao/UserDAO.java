package com.acsc.manager.dao;

import com.acsc.commons.entity.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface UserDAO {

    List<User> queryAll(@Param("start")Integer start, @Param("limit")Integer limit, @Param("vipNum")String vipNum, @Param("clubId")String clubId, @Param("mobile")String mobile);

    User queryById(String userId);

    int getUserNum(@Param("vipNum")String vipNum, @Param("clubId")String clubId, @Param("mobile")String mobile);

    void insert(User user);

    void update(User user);

    Map<String, Object> queryUserAndVipNum();

}
