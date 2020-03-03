package com.acsc.api.dao;

import com.acsc.api.entity.Activitys;
import com.acsc.commons.entity.Activity;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ActivityDAO {

    List<Activitys> queryAll(@Param("begin") Integer begin, @Param("limit") Integer limit, @Param("orderby") String orderby);

    Activity queryByActivityId(String activityId);

    Integer queryActivityNum();

}
