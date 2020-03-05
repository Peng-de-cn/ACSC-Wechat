package com.acsc.manager.dao;


import com.acsc.commons.entity.Admin;
import org.apache.ibatis.annotations.Param;

public interface AdminDAO {

    Admin queryByUsername(String username);

    Admin queryById(String adminId);

    void insert(Admin admin);

    void update(Admin admin);

    void updatePasswd(@Param("adminId") String adminId, @Param("passwd") String passwd);

}
