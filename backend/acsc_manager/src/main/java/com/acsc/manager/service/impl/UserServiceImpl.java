package com.acsc.manager.service.impl;

import com.acsc.commons.entity.User;
import com.acsc.commons.vo.ResultVO;
import com.acsc.manager.dao.UserDAO;
import com.acsc.manager.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Resource
    private UserDAO userDAO;


    @Override
    public Map<String,Object> getUserList(Integer page, Integer limit, String vipNum, String clubId, String mobile) {

        Integer start = (page-1)*limit;

        List<User> users = userDAO.queryAll(start, limit, vipNum, clubId, mobile);

        HashMap<String, Object> map = new HashMap<>();

        map.put("code",0);
        map.put("msg","ok");
        map.put("count",userDAO.getUserNum(vipNum, clubId, mobile));
        map.put("data",users);


        return map;
    }

    @Override
    public User getUserById(String userId) {
        return userDAO.queryById(userId);
    }

    @Override
    public ResultVO add(User user) {

        ResultVO resultVO = new ResultVO();

        user.setUserId(UUID.randomUUID().toString().replace("-",""));

        try {
            userDAO.insert(user);
            resultVO.setStatus(true).setErrmsg("ok");
        }catch (Exception e){
            e.printStackTrace();
            resultVO.setStatus(false).setErrmsg("服务器出错");
        }
        return resultVO;
    }

    @Override
    public ResultVO modify(User user) {

        ResultVO resultVO = new ResultVO();

        try {
            userDAO.update(user);
            resultVO.setStatus(true).setErrmsg("ok");
        }catch (Exception e){
            e.printStackTrace();
            resultVO.setStatus(false).setErrmsg("服务器出错");
        }

        return resultVO;
    }

}
