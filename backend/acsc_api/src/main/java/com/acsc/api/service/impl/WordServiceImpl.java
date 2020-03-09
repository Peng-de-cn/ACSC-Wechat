package com.acsc.api.service.impl;

import com.acsc.api.dao.WordDAO;
import com.acsc.api.service.WordService;
import com.acsc.commons.entity.Word;
import com.acsc.commons.vo.ResultVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;
@Slf4j
@Service
public class WordServiceImpl implements WordService {

    @Resource
    private WordDAO wordDAO;

    @Override
    public ResultVO getWordList() {
        ResultVO resultvo=new ResultVO();
        try {
            List<String> words = wordDAO.queryWordList();
            resultvo.setStatus(true).setData(words);
        } catch (Exception  e) {
            log.info("查询热词出错"+e.getMessage());
            resultvo.setStatus(false).setErrmsg("查询热词失败");
        }
        return resultvo;
    }


}
