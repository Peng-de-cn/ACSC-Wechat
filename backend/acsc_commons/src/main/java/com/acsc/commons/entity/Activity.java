package com.acsc.commons.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

    /** 活动创建时间 */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date createTime;

    /** 活动图片数组 */
    private String[] imageArr;

    /** 活动咨询电话数组 */
    private String[] mobileArr;

    /**
     * 图片数组获取方法
     * @return
     */
    public String[] getImageArr() {
        return this.images.split(",");
    }

    /**
     * 咨询电话数组获取方法
     * @return
     */
    public String[] getMobileArr() {

        String mobiles = this.advisory;

        if(mobiles.length() <= 0) {
            return null;
        }

        //手机号正则匹配
        Pattern pattern = Pattern.compile("(1|861)(3|5|8)\\d{9}$*");
        Matcher matcher = pattern.matcher(mobiles);
        StringBuffer stringBuffer = new StringBuffer();
        while (matcher.find()) {
            stringBuffer.append(matcher.group()).append(",");
        }
        int len = stringBuffer.length();
        if (len > 0) {
            stringBuffer.deleteCharAt(len - 1);
        }

        return stringBuffer.toString().split(",");
    }

}
