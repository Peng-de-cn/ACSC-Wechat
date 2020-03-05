package com.acsc.manager.service;

import com.acsc.commons.entity.Word;
import com.acsc.commons.vo.ResultVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface WordService {

    Map<String,Object> getWordList(Integer page, Integer limit);

    ResultVO add(Word word);

    ResultVO remove(String wordId);

    ResultVO modify(Word word);

    ResultVO modifyStatus(String wordId, Integer status);

    Word getWordById(String wordId);

}
