package com.acsc.commons.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Data
@Accessors(chain = true)
public class Activity {

    /** 活动ID */
    private String activityId;

    /** 活动名称 */
    private String title;

    /** 报名开始时间 */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "GMT+8")
    private Date applyBegin;

    /** 报名结束时间 */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "GMT+8")
    private Date applyEnd;

    /** 活动开始时间 */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "GMT+8")
    private Date beginTime;

    /** 活动结束时间 */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "GMT+8")
    private Date endTime;

    /** 活动人数 */
    private Integer quota;

    /** 活动地址 */
    private String address;

    /** 活动咨询 */
    private String advisory;

    /** 退款信息 */
    private String refundInfo;

    /** 活动图片 */
    private String images;

    /** 活动推荐理由 */
    private String recommend;

    /** 活动详情 */
    private String details;

    /** 活动须知 */
    private String notice;

    /** 活动套餐 */
    private List<ActivityPackage> packages;

    /** 活动所属俱乐部 */
    private Club club;

}
