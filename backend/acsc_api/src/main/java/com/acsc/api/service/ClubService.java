package com.acsc.api.service;


import com.acsc.commons.vo.ResultVO;

public interface ClubService {

    ResultVO getClubList(Integer page, Integer limit);

    ResultVO getAllClub();

    ResultVO getClubById(String clubId);

}
