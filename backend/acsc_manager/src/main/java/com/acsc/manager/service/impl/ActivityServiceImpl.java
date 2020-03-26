package com.acsc.manager.service.impl;

import com.acsc.commons.entity.Activity;
import com.acsc.commons.entity.ActivityPackage;
import com.acsc.commons.vo.ResultVO;
import com.acsc.manager.dao.ActivityDAO;
import com.acsc.manager.dao.PackageDAO;
import com.acsc.manager.service.ActivityService;
import com.acsc.manager.vo.UserActivityVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;

@Service
@Transactional
public class ActivityServiceImpl implements ActivityService {

    @Resource
    private ActivityDAO activityDAO;

    @Resource
    private PackageDAO packageDAO;

    /**
     * 获取活动列表
     * @param page
     * @param limit
     * @return
     */
    @Override
    public Map<String, Object> getActivityList(Integer page, Integer limit, String title, String clubId) {

        int begin = (page - 1)*limit;

        List<Activity> activities = activityDAO.queryAll(begin, limit, title, clubId);

        HashMap<String, Object> map = new HashMap<>();

        map.put("code",0);
        map.put("msg","ok");
        map.put("count",activityDAO.queryActivityNum(title, clubId));
        map.put("data",activities);

        return map;
    }

    @Override
    public Activity getActivityById(String activityId) {

        /*ResultVO resultVO = new ResultVO();

        try {
            Activity activity = activityDAO.queryByActivityId(activityId);
            resultVO.setStatus(true).setErrmsg("ok").setData(activity);
        }catch (Exception e){
            e.printStackTrace();
            resultVO.setStatus(false).setErrmsg("服务器出错");
        }*/
        return activityDAO.queryByActivityId(activityId);
    }

    /**
     * 添加活动
     * @param activity
     * @return
     */
    @Override
    public ResultVO add(Activity activity) {


        String activityId = UUID.randomUUID().toString().replace("-", "");
        activity.setActivityId(activityId);
        activity.setCreateTime(new Date());
        List<ActivityPackage> packages = activity.getPackages();

        for (ActivityPackage aPackage : packages) {
            aPackage.setActivityId(activityId);
            aPackage.setPackageId(UUID.randomUUID().toString().replace("-",""));
        }

        ResultVO resultVO = new ResultVO();

        try {
            activityDAO.insert(activity);

            packageDAO.insertPackages(activity.getPackages());

            resultVO.setStatus(true).setErrmsg("ok");
        }catch (Exception e){
            e.printStackTrace();
            resultVO.setStatus(false).setErrmsg("添加失败");
        }


        return resultVO;
    }

    /**
     * 根据ID删除活动
     * @param activityId
     * @return
     */
    @Override
    public ResultVO remove(String activityId) {

        ResultVO resultVO = new ResultVO();

        try {
            activityDAO.delByActivityId(activityId);
            packageDAO.delPackagesByActivityId(activityId);
            resultVO.setStatus(true).setErrmsg("ok");
        }catch (Exception e){
            e.printStackTrace();
            resultVO.setStatus(false).setErrmsg("删除失败");
        }
        return resultVO;
    }

    /**
     * 更新活动信息
     * @param activity
     * @return
     */
    @Override
    public ResultVO modify(Activity activity) {

        ResultVO resultVO = new ResultVO();

        List<ActivityPackage> packages = activity.getPackages();

        String activityId = activity.getActivityId();
        for (ActivityPackage aPackage : packages) {
            aPackage.setActivityId(activityId);
            aPackage.setPackageId(UUID.randomUUID().toString());
        }

        try {
            activityDAO.updateActivityById(activity);

            packageDAO.delPackagesByActivityId(activityId);

            packageDAO.insertPackages(activity.getPackages());

            resultVO.setStatus(true).setErrmsg("ok");
        }catch (Exception e){
            e.printStackTrace();
            resultVO.setStatus(false).setErrmsg("更新失败");
        }
        return resultVO;
    }

    /**
     * 获取活动报名用户
     * @param activityId
     * @param page
     * @param limit
     * @return
     */
    @Override
    public Map<String, Object> getUsersForActivity(String activityId, Integer page, Integer limit) {

        Integer begin = (page - 1)*limit;

        List<UserActivityVO> activityVOS = activityDAO.queryUserByActivityId(activityId, begin, limit);

        HashMap<String, Object> map = new HashMap<>();

        map.put("code",0);
        map.put("msg","ok");
        map.put("count",activityDAO.queryUsersActivityNum(activityId));
        map.put("data",activityVOS);

        return map;
    }

    /**
     * 获取活动总数
     * @return
     */
    @Override
    public Integer getActivityNum() {
        return activityDAO.queryActivityNum(null, null);
    }
}
