package com.acsc.api.controller;


import com.acsc.api.service.FavoriteService;
import com.acsc.commons.vo.ResultVO;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/favorite")
public class FavoriteController {


    @Resource
    private FavoriteService favoriteService;

    @RequestMapping("insertFavorite")
    public ResultVO insertFavorite(String userId, String activityId){
        return favoriteService.insertFavorite(userId,activityId);
    }

    @RequestMapping("deleteFavorite")
    public ResultVO deleteFavorite(String userId, String activityId){
        return favoriteService.deleteFavorite(userId,activityId);
    }

    @RequestMapping("selectFavoriteById")
    public ResultVO selectFavoriteById(String userId){
        return favoriteService.selectFavoriteById(userId);
    }

}
