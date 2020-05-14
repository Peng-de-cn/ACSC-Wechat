package com.acsc.manager.dao;

import com.acsc.commons.entity.Word;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface WordDAO {

    List<Word> queryWordList(@Param("begin") Integer begin, @Param("limit") Integer limit);

    Integer queryWordsNum(@Param("begin") Integer begin, @Param("limit") Integer limit);

    Word queryById(String wordId);

    void insert(Word word);

    void delete(@Param("wordId") String wordId);

    void update(Word word);

    void updateStatus(@Param("wordId") String wordId, @Param("status") Integer status);

}
