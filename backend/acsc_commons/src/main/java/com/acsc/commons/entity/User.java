package com.acsc.commons.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@Accessors(chain = true)
public class User {

    /** 用户ID */
    private String userId;
    /** 姓 */
    private String lastName;
    /** 名 */
    private String firstName;
    /** 性别 */
    private Integer gender;
    /** 生日 */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd",timezone = "GMT+8")
    private Date birthday;
    /** 邮箱 */
    private String email;
    /** 手机号 */
    private String mobile;
    /** 地址 */
    private String address;
    /** 头像 */
    private String avatar;
    /** 微信名 */
    private String wechatName;
    /** 微信号 */
    private String wechatNum;
    /** 注册时间 */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "GMT+8")
    private Date createTime;
    /** 会员号 */
    private String vipNum;
    /** 会员等级 */
    private String vipLevel;
    /** 会员俱乐部 */
    private String clubId;
    /** 备用手机号 */
    private String backupMobile;

}
