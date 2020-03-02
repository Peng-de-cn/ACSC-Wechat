package com.acsc.commons.entity;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.math.BigInteger;

@Data
@Accessors(chain = true)
public class Admin implements Serializable {

    /** 管理ID */
    private BigInteger adminId;
    /** 用户名 */
    private String username;
    /** 密码 */
    private String passwd;

    private String salt;
    /** 邮箱 */
    private String email;
    /** 手机号 */
    private String mobile;
    /** 姓名 */
    private String name;
    /** 状态 */
    private Integer status;


}
