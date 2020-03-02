package com.acsc.manager.service.impl;

import com.acsc.commons.entity.Admin;
import com.acsc.commons.vo.ResultVO;
import com.acsc.manager.service.AdminService;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Service;


@Slf4j
@Service
public class AdminServiceImpl implements AdminService {

    @Override
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

    }

    @Override
    public void logout() {

    }
}
