package com.acsc.manager.controller;

import com.acsc.commons.entity.Word;
import com.acsc.commons.vo.ResultVO;
import com.acsc.manager.service.WordService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;

@RestController
@RequestMapping("/word")
public class WordController {

    @Resource
    private WordService wordService;

    @RequestMapping("list")
    public Map<String, Object> list(Integer page, Integer limit){
        return wordService.getWordList(page, limit);
    }

    @RequestMapping("add")
    public ResultVO add(Word word){
        return wordService.add(word);
    }

    @RequestMapping("update")
    public ResultVO update(Word word){
        return wordService.modify(word);
    }

    @RequestMapping("delete")
    public ResultVO delete(String wordId){
        return wordService.remove(wordId);
    }

    @RequestMapping("updateStatus")
    public ResultVO updateStatus(String wordId, Integer status){
        return wordService.modifyStatus(wordId, status);
    }

}
