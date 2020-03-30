package com.acsc.api.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.experimental.Accessors;

import java.math.BigDecimal;
import java.util.Date;

@Data
@Accessors(chain = true)
public class UserActivity {

    /** 主键ID */
    private String id;
    /** 报名用户 */
    private String userId;
    /** 所选套餐 */
    private String packageId;
    /** 报名活动 */
    private String activityId;
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
