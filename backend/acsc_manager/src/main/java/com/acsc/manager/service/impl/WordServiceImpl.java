package com.acsc.manager.service.impl;

import com.acsc.commons.entity.Activity;
import com.acsc.commons.entity.Admin;
import com.acsc.commons.entity.Word;
import com.acsc.commons.vo.ResultVO;
import com.acsc.manager.dao.WordDAO;
import com.acsc.manager.service.WordService;
import org.apache.shiro.SecurityUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;

@Service
public class WordServiceImpl implements WordService {

    @Resource
    private WordDAO wordDAO;

    @Override
    public Map<String, Object> getWordList(Integer page, Integer limit) {

        HashMap<String, Object> map = new HashMap<>();

        try {
            int begin = (page - 1) * limit;
            List<Word> words = wordDAO.queryWordList(begin, limit);
            map.put("code", 0);
            map.put("msg", "ok");
            map.put("count", wordDAO.queryWordsNum(begin, limit));
            map.put("data", words);
        }catch (Exception e){
            e.printStackTrace();
            map.put("code", 500);
            map.put("msg", "error");
        }
        return map;
    }

    @Override
    public ResultVO add(Word word) {

        ResultVO resultVO = new ResultVO();

        word.setWordId(UUID.randomUUID().toString().replace("-",""));
        word.setCreateTime(new Date());

        try {
            Admin admin = (Admin) SecurityUtils.getSubject().getPrincipal();
            word.setCreateAdminId(admin.getAdminId());
            wordDAO.insert(word);
            resultVO.setStatus(true).setErrmsg("ok");
        }catch (Exception e){
            e.printStackTrace();
            resultVO.setStatus(false).setErrmsg("error");
        }
        return resultVO;
    }


    @Override
    public ResultVO remove(String wordId) {
        ResultVO resultVO = new ResultVO();

        try {
            wordDAO.delete(wordId);
            resultVO.setStatus(true).setErrmsg("ok");
        }catch (Exception e){
            e.printStackTrace();
            resultVO.setStatus(false).setErrmsg("error");
        }
        return resultVO;
    }

    @Override
    public ResultVO modify(Word word) {

        ResultVO resultVO = new ResultVO();

        try {
            wordDAO.update(word);
            resultVO.setStatus(true).setErrmsg("ok");
        }catch (Exception e){
            e.printStackTrace();
            resultVO.setStatus(false).setErrmsg("error");
        }
        return resultVO;
    }

    @Override
    public ResultVO modifyStatus(String wordId, Integer status) {

        ResultVO resultVO = new ResultVO();

        try {
            wordDAO.updateStatus(wordId, status);
            resultVO.setStatus(true).setErrmsg("ok");
        }catch (Exception e){
            e.printStackTrace();
            resultVO.setStatus(false).setErrmsg("error");
        }
        return resultVO;
    }

    @Override
    public Word getWordById(String wordId) {
        return wordDAO.queryById(wordId);
    }
}
