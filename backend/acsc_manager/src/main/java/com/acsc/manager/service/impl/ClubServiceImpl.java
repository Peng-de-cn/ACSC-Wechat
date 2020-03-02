package com.acsc.manager.service.impl;

import com.acsc.commons.entity.Admin;
import com.acsc.commons.entity.Club;
import com.acsc.commons.vo.ResultVO;
import com.acsc.manager.dao.ClubDAO;
import com.acsc.manager.service.ClubService;
import org.apache.shiro.SecurityUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;

@Service
@Transactional
public class ClubServiceImpl implements ClubService {

    @Resource
    private ClubDAO clubDAO;

    @Override
    public Map<String, Object> getClubList(Integer page, Integer limit) {

        HashMap<String, Object> map = new HashMap<>();

        List<Club> clubs = clubDAO.queryAll();

        map.put("code",0);
        map.put("msg","ok");
        map.put("count",clubDAO.queryCount());
        map.put("data",clubs);

        return map;
    }

    @Override
    public List<Club> getAllClub() {
        return clubDAO.queryAll();
    }

    @Override
    public Club getClubById(String clubId) {
        return clubDAO.queryById(clubId);
    }

    @Override
    public ResultVO add(Club club) {

        club.setClubId(UUID.randomUUID().toString().replace("-",""));

        club.setAddTime(new Date());

        ResultVO resultVO = new ResultVO();
        try {
            Admin admin = (Admin) SecurityUtils.getSubject().getPrincipal();
            club.setAdmin(admin);
            clubDAO.insert(club);
            resultVO.setStatus(true).setErrmsg("ok");
        }catch (Exception e){
            e.printStackTrace();
            resultVO.setStatus(false).setErrmsg("服务器出错");
        }
        return resultVO;
    }

    @Override
    public ResultVO modify(Club club) {

        ResultVO resultVO = new ResultVO();

        try {
            clubDAO.update(club);
            resultVO.setStatus(true).setErrmsg("ok");
        }catch (Exception e){
            e.printStackTrace();
            resultVO.setStatus(false).setErrmsg("服务器出错");
        }
        return resultVO;
    }

    @Override
    public ResultVO remove(String clubId) {

        ResultVO resultVO = new ResultVO();
        try {
            clubDAO.delete(clubId);
            resultVO.setStatus(true).setErrmsg("ok");
        }catch (Exception e){
            e.printStackTrace();
            resultVO.setStatus(false).setErrmsg("服务器出错");
        }
        return resultVO;
    }
}
