package com.acsc.manager.dao;

import com.acsc.commons.entity.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserDAO {

    List<User> queryAll(@Param("start") Integer start, @Param("limit") Integer limit);

    User queryById(String userId);

    int getUserNum();

    void insert(User user);

    void update(User user);

}
