package com.acsc.manager.dao;

import com.acsc.commons.entity.Menu;

import java.math.BigInteger;
import java.util.List;

public interface MenuDAO {

    List<Menu> queryByRoleId(BigInteger roleId);

}
