package com.acsc.api.service.impl;

import com.acsc.api.dao.ClubDAO;
import com.acsc.api.service.ClubService;
import com.acsc.commons.entity.Club;
import com.acsc.commons.vo.ResultVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;

@Slf4j
@Service
@Transactional
public class ClubServiceImpl implements ClubService {

    @Resource
    private ClubDAO clubDAO;

    @Override
    public ResultVO getClubList(Integer page, Integer limit) {

        ResultVO resultVO = new ResultVO();
        try {
            List<Club> clubs = clubDAO.queryAll();
            resultVO.setStatus(true).setData(clubs);
        }catch (Exception e){
            log.info("数据库查询俱乐部出错!"+e.getMessage());
            resultVO.setStatus(false).setErrmsg("数据库查询俱乐部出错!");
        }
        return resultVO;
    }

    @Override
    public ResultVO getAllClub() {
        ResultVO resultVO = new ResultVO();
        try {
            List<Club> clubs = clubDAO.queryAll();
            resultVO.setStatus(true).setData(clubs);
        }catch (Exception e){
            log.info("数据库查询俱乐部出错!"+e.getMessage());
            resultVO.setStatus(false).setErrmsg("数据库查询俱乐部出错!");
        }
        return resultVO;
    }

    @Override
    public ResultVO getClubById(String clubId) {
        ResultVO resultVO = new ResultVO();
        try {
            Club club = clubDAO.queryById(clubId);
            resultVO.setStatus(true).setData(club);
        }catch (Exception e){
            log.info("数据库查询俱乐部出错!"+e.getMessage());
            resultVO.setStatus(false).setErrmsg("数据库查询俱乐部出错!");
        }
        return resultVO;

    }
}
