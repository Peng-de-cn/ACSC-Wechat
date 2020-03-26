package com.acsc.api.dao;

import com.acsc.commons.entity.Club;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ClubDAO {

    List<Club> queryByPage(@Param("begin") Integer begin, @Param("limit") Integer limit);

    List<Club> queryAll();

    int queryCount();

    Club queryById(String clubId);

}
