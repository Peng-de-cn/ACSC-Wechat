package com.acsc.manager.dao;


import com.acsc.commons.entity.Admin;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AdminDAO {

    Admin queryByUsername(String username);

    Admin queryById(String adminId);

    void insert(Admin admin);

    void update(Admin admin);

    void updatePasswd(@Param("adminId") String adminId, @Param("passwd") String passwd);

    void updateStatus(@Param("adminId") String adminId, @Param("status") Integer status);

    List<Admin> queryAll(@Param("begin") Integer begin, @Param("limit") Integer limit);

    Integer queryAdminNum();

    void delete(String adminId);

}
