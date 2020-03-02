package com.acsc.manager.service;


import com.acsc.commons.entity.Club;
import com.acsc.commons.vo.ResultVO;

import java.util.List;
import java.util.Map;

public interface ClubService {

    Map<String,Object> getClubList(Integer page, Integer limit);

    List<Club> getAllClub();

    Club getClubById(String clubId);

    ResultVO add(Club club);

    ResultVO modify(Club club);

    ResultVO remove(String clubId);

}
