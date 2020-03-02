package com.acsc.commons.entity;


import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;

@Data
@Accessors(chain = true)
public class Menu implements Serializable {
    /** 菜单ID */
    private BigInteger menuId;
    /** 父菜单ID */
    private BigInteger parentId;
    /** 菜单名称 */
    private String name;
    /** 菜单URL */
    private String url;
    /** 授权 */
    private String perms;
    /** 类型 */
    private Integer type;
    /** 菜单图标 */
    private String icon;
    /** 排序 */
    private Integer orderNum;
    /** 创建时间 */
    private Date createTime;
    /** 更新时间 */
    private Date updateTime;

}
