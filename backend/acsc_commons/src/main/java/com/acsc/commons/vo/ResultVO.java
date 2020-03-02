package com.acsc.commons.vo;


import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class ResultVO {

    private Boolean status;

    private String errmsg;

    private Object data;

}
