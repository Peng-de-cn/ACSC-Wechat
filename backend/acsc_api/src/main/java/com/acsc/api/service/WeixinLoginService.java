package com.acsc.api.service;


import com.acsc.commons.vo.ResultVO;

public interface WeixinLoginService {

    ResultVO login(String jscode);

}
