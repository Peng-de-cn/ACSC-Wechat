package com.acsc.api.dao;

import com.acsc.commons.entity.User;

public interface UserDAO {

    void insertUser(User user);
    void updateUserById(User user);
    User queryUserById(String userId);

}
