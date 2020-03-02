package com.acsc.manager.dao;

import com.acsc.commons.entity.Role;

import java.math.BigInteger;
import java.util.List;

public interface RoleDAO {

    List<Role> queryByAdminId(BigInteger adminId);

}
