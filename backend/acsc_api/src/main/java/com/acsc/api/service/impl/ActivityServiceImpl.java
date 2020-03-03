package com.acsc.api.service.impl;

import com.acsc.api.dao.ActivityDAO;
import com.acsc.api.entity.Activitys;
import com.acsc.api.service.ActivityService;
import com.acsc.commons.entity.Activity;
import com.acsc.commons.vo.ResultVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
@Slf4j
@Service
@Transactional
public class ActivityServiceImpl implements ActivityService {

    @Resource
    private ActivityDAO activityDAO;

    /**
     * 获取活动列表
     * @param page
     * @param limit
     * @return
     */
    @Override
    public ResultVO getActivityList(Integer page, Integer limit,String orderby) {
        ResultVO resultVO = new ResultVO();
        try {
            int begin = (page - 1)*limit;

            List<Activitys> activities = activityDAO.queryAll(begin, limit,orderby);

            HashMap<String, Object> map = new HashMap<>();
            map.put("count",activityDAO.queryActivityNum());
            map.put("activities",activities);

            resultVO.setStatus(true).setData(map);
        }catch (Exception e){
            log.info("查询数据库活动出错!"+e.getMessage());
            resultVO.setStatus(false).setErrmsg("查询数据库活动出错!");
        }
        return resultVO;
    }

    @Override
    public ResultVO getActivityById(String activityId) {
        ResultVO resultVO = new ResultVO();

        try {
            Activity activity = activityDAO.queryByActivityId(activityId);
            resultVO.setStatus(true).setErrmsg(null).setData(activity);
        }catch (Exception e){
            log.info("查询数据库活动出错!"+e.getMessage());
            resultVO.setStatus(false).setErrmsg("查询数据库活动出错!");
        }
        return resultVO;
    }

}