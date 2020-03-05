package com.acsc.api.service.impl;

import com.acsc.api.dao.FavoriteDAO;
import com.acsc.api.entity.Activitys;
import com.acsc.api.service.FavoriteService;
import com.acsc.commons.vo.ResultVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Slf4j
@Transactional
@Service
public class FavoriteServiceImpl implements FavoriteService {

    @Resource
    private FavoriteDAO favoriteDAO;

    @Override
    public ResultVO insertFavorite(String userId, String activityId) {
        ResultVO resultVO = new ResultVO();
        try {
            favoriteDAO.insertFavorite(userId,activityId);
            resultVO.setStatus(true);
        }catch (Exception e){
            log.info("数据库录入收藏夹出错!"+e.getMessage());
            resultVO.setStatus(false).setErrmsg("数据库录入收藏夹出错!");
        }
        return resultVO;
    }

    @Override
    public ResultVO deleteFavorite(String userId, String activityId) {
        ResultVO resultVO = new ResultVO();
        try {
            favoriteDAO.deleteFavorite(userId,activityId);
            resultVO.setStatus(true);
        }catch (Exception e){
            log.info("数据库删除收藏出错!"+e.getMessage());
            resultVO.setStatus(false).setErrmsg("数据库删除收藏出错!");
        }
        return resultVO;
    }

    @Override
    public ResultVO selectFavoriteById(String userId) {
        ResultVO resultVO = new ResultVO();
        try {
            List<Activitys> activitys = favoriteDAO.selectFavoriteById(userId);
            resultVO.setStatus(true).setData(activitys);
        }catch (Exception e){
            log.info("数据库查询收藏出错!"+e.getMessage());
            resultVO.setStatus(false).setErrmsg("数据库查询收藏出错!");
        }
        return resultVO;    }
}
