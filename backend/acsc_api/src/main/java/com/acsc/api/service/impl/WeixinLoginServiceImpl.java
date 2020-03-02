package com.acsc.api.service.impl;

import com.acsc.api.entity.WeixinProperties;
import com.acsc.api.service.WeixinLoginService;
import com.acsc.api.util.HttpClientUtil;
import com.acsc.commons.vo.ResultVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Service
@Transactional
public class WeixinLoginServiceImpl implements WeixinLoginService {

    @Autowired
    WeixinProperties weixinProperties;
/*    @Override
    public ResultVO login(String username, String passwd) {


        log.info("开始登入.....");

        ResultVO resultVO = new ResultVO();
        // 获取Subject实例对象，用户实例
        Subject currentUser = SecurityUtils.getSubject();

        // 将用户名和密码封装到UsernamePasswordToken
        UsernamePasswordToken token = new UsernamePasswordToken(username, passwd);
        // 4、认证
        try {
            // 传到 MyShiroRealm 类中的方法进行认证
            currentUser.login(token);
            // 构建缓存用户信息返回给前端
            Admin admin = (Admin) currentUser.getPrincipals().getPrimaryPrincipal();

            admin.setPasswd(null).setSalt(null);

            resultVO.setStatus(true).setErrmsg("登录成功").setData(admin);

        } catch (UnknownAccountException e) {
            resultVO.setStatus(false).setErrmsg("账户不存在");
        } catch (IncorrectCredentialsException e) {
            resultVO.setStatus(false).setErrmsg("密码错误");
        } catch (AuthenticationException e) {
            resultVO.setStatus(false).setErrmsg("身份验证异常");
        }

        return resultVO;

    }*/

    @Override
    public ResultVO login(String jscode) {
        log.info("微信开始登入.....");
        ResultVO resultvo=new ResultVO();
        try {
            System.out.println(weixinProperties);
            String data1="appid="+weixinProperties.getAppid()+"&secret="+weixinProperties.getSecret()+"js_code="+jscode+"grant_type=authorization_code";
            resultvo = HttpClientUtil.sendUrl(weixinProperties.getHost(), data1);
            System.out.println(resultvo);
        } catch (Exception  e) {
            log.info("微信登入出错"+e.getMessage());
            resultvo.setStatus(false).setErrmsg("登录请求发送失败");
        }
        return resultvo;
    }
}
