package com.acsc.api.entity;

import com.acsc.commons.entity.Activity;
import com.acsc.commons.entity.ActivityPackage;
import com.acsc.commons.entity.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class UserActivityVO {

    /** 主键ID */
    private String id;
/*    *//** 报名用户 *//*
    private User user;*/
    /** 所选套餐 */
    private ActivityPackage activityPackage;
    /** 报名活动 */
    private Activity activity;
    /** 状态 */
    private Integer status;
    /** 支付金额 */
    private BigDecimal amount;
    /** 备注 */
    private String remark;
    /** 报名时间 */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date applyTime;

}
