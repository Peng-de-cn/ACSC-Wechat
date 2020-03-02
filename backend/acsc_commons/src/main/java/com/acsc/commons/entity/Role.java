package com.acsc.commons.entity;


import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;

@Data
@Accessors(chain = true)
public class Role implements Serializable {

    /** 角色ID */
    private BigInteger roleId;
    /** 角色名 */
    private String roleName;
    /** 备注 */
    private String remark;
    /** 创建者ID */
    private Integer createAdminId;
    /** 创建时间 */
    private Date createTime;
    /** 更新时间 */
    private Date updateTime;

}
