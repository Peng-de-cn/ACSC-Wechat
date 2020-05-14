package com.acsc.api.service;

import com.acsc.commons.vo.ResultVO;


public interface FavoriteService {

    ResultVO insertFavorite(String userId,String activityId);
    ResultVO deleteFavorite(String userId,String activityId);
    ResultVO selectFavoriteById(String userId);

}
