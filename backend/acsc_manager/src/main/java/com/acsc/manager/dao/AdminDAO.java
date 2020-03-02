package com.acsc.manager.dao;


import com.acsc.commons.entity.Admin;

public interface AdminDAO {

    Admin queryByUsername(String username);

}
