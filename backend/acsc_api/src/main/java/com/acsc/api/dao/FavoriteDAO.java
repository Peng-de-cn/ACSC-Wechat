package com.acsc.api.dao;

import com.acsc.api.entity.Activitys;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface FavoriteDAO {

    void insertFavorite(@Param("userId")String userId, @Param("activityId")String activityId);
    void deleteFavorite(@Param("userId")String userId, @Param("activityId")String activityId);
    List<Activitys> selectFavoriteById(String userId);
    Integer selectIsFavorite(@Param("userId")String userId, @Param("activityId")String activityId);

}
