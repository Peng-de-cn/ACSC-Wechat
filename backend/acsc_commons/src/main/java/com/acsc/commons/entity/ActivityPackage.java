package com.acsc.commons.entity;

import lombok.Data;
import lombok.experimental.Accessors;

import java.math.BigDecimal;

@Data
@Accessors(chain = true)
public class ActivityPackage {

    /** 活动套餐ID */
    private String packageId;
    /** 套餐名 */
    private String title;
    /** 套餐价格 */
    private BigDecimal price;
    /** 活动ID */
    private String activityId;

}
