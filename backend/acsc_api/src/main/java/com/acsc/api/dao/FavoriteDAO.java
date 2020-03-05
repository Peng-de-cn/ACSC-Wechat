package com.acsc.api.dao;

import com.acsc.api.entity.Activitys;

import java.util.List;

public interface FavoriteDAO {

    void insertFavorite(String userId,String activityId);
    void deleteFavorite(String userId,String activityId);
    List<Activitys> selectFavoriteById(String userId);

}
