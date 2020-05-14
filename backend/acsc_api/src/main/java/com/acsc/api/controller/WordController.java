package com.acsc.api.controller;

import com.acsc.api.service.WordService;
import com.acsc.commons.vo.ResultVO;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/word")
public class WordController {

    @Resource
    private WordService wordService;

    @RequestMapping("getlist")
    public ResultVO list(){
        return wordService.getWordList();
    }

}
