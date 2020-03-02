package com.acsc.commons.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.Date;

@Data
@Accessors(chain = true)
public class Club {

    /** 俱乐部ID */
    private String clubId;

    /** 俱乐部名称 */
    private String clubName;

    /** 会员后缀 */
    private String vipSuffix;

    /** 添加时间 */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "GMT+8")
    private Date addTime;

    /** 管理员 */
    private Admin admin;

}
