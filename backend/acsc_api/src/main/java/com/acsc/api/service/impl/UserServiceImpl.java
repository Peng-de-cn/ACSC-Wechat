package com.acsc.api.service.impl;

import com.acsc.api.dao.UserDAO;
import com.acsc.api.service.UserService;
import com.acsc.commons.entity.User;
import com.acsc.commons.vo.ResultVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Slf4j
@Transactional
@Service
public class UserServiceImpl implements UserService {

    @Resource
    private UserDAO userDAO;

    @Override
    public ResultVO insertUser(User user) {
        ResultVO resultVO = new ResultVO();
        try {
            userDAO.insertUser(user);
            resultVO.setStatus(true);
        }catch (Exception e){
            log.info("数据库录入用户出错!"+e.getMessage());
            resultVO.setStatus(false).setErrmsg("数据库录入用户出错!");
        }
        return resultVO;
    }

    @Override
    public ResultVO updateUserById(User user) {
        ResultVO resultVO = new ResultVO();
        try {
            userDAO.updateUserById(user);
            resultVO.setStatus(true);
        }catch (Exception e){
            log.info("数据库更新用户出错!"+e.getMessage());
            resultVO.setStatus(false).setErrmsg("数据库更新用户出错!");
        }
        return resultVO;

    }

    @Override
    public ResultVO queryUserById(String userId) {
        ResultVO resultVO = new ResultVO();
        try {
            User user = userDAO.queryUserById(userId);
            resultVO.setStatus(true).setData(user);
        }catch (Exception e){
            log.info("数据库查询用户出错!"+e.getMessage());
            resultVO.setStatus(false).setErrmsg("数据库查询用户出错!");
        }
        return resultVO;
    }
}
