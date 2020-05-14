package com.acsc.commons.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class Word {
    /** 热词Id */
    private String wordId;
    /** 热词 */
    private String word;
    /** 状态 */
    private Integer status;
    /** 点击次数 （备用字段） */
    private Integer clickNum;
    /** 创建时间 */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date createTime;
    /** 创建者Id */
    private String createAdminId;
}
