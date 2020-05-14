package com.acsc.manager.service.impl;

import com.acsc.commons.entity.Activity;
import com.acsc.commons.entity.Admin;
import com.acsc.commons.vo.ResultVO;
import com.acsc.manager.dao.AdminDAO;
import com.acsc.manager.service.AdminService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.RandomStringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.security.auth.login.AccountLockedException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static com.acsc.manager.utils.ShiroUtils.sha256;


@Slf4j
@Service
public class AdminServiceImpl implements AdminService {

    @Resource
    private AdminDAO adminDAO;

    /**
     * 管理员登录
     * @param username
     * @param passwd
     * @return
     */
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
        } catch (LockedAccountException e){
            resultVO.setStatus(false).setErrmsg("账户已被禁用");
        } catch (AuthenticationException e) {
            resultVO.setStatus(false).setErrmsg("身份验证异常");
        }

        return resultVO;

    }

    /**
     * 添加管理员
     * @param admin
     * @return
     */
    @Override
    public ResultVO add(Admin admin) {

        ResultVO resultVO = new ResultVO();

        try {
            admin.setAdminId(UUID.randomUUID().toString().replace("-", ""));
            //生成salt
            String salt = RandomStringUtils.randomAlphanumeric(6);
            admin.setSalt(salt);
            //密码加密
            admin.setPasswd(sha256(admin.getPasswd(), salt));
            admin.setStatus(1);
            adminDAO.insert(admin);
            resultVO.setStatus(true).setErrmsg("ok");
        }catch (Exception e){
            e.printStackTrace();
            resultVO.setStatus(false).setErrmsg("error");
        }
        return resultVO;
    }

    /**
     * 修改管理员信息
     * @param admin
     * @return
     */
    @Override
    public ResultVO modifyInfo(Admin admin) {

        ResultVO resultVO = new ResultVO();

        try {
            adminDAO.update(admin);
            resultVO.setStatus(true).setErrmsg("ok");
        }catch (Exception e){
            e.printStackTrace();
            resultVO.setStatus(false).setErrmsg("error");
        }

        return resultVO;
    }

    /**
     * 修改密码
     * @param passwd
     * @return
     */
    @Override
    public ResultVO modifyPasswd(String passwd) {

        ResultVO resultVO = new ResultVO();

        try {

            Admin adminSession = (Admin) SecurityUtils.getSubject().getPrincipal();

            Admin admin = adminDAO.queryById(adminSession.getAdminId());

            String newPasswd = sha256(passwd, admin.getSalt());

            adminDAO.updatePasswd(admin.getAdminId(),newPasswd);

            resultVO.setStatus(true).setErrmsg("ok");

        }catch (Exception e){
            e.printStackTrace();
            resultVO.setStatus(false).setErrmsg("error");
        }

        return resultVO;
    }

    @Override
    public ResultVO modifyStatus(String adminId, Integer status) {
        ResultVO resultVO = new ResultVO();

        try {

            adminDAO.updateStatus(adminId, status);

            resultVO.setStatus(true).setErrmsg("ok");

        }catch (Exception e){
            e.printStackTrace();
            resultVO.setStatus(false).setErrmsg("error");
        }

        return resultVO;
    }

    @Override
    public Map<String, Object> getAdminList(Integer page, Integer limit) {
        int begin = (page - 1)*limit;

        List<Admin> admins = adminDAO.queryAll(begin, limit);

        HashMap<String, Object> map = new HashMap<>();

        map.put("code",0);
        map.put("msg","ok");
        map.put("count",adminDAO.queryAdminNum());
        map.put("data",admins);

        return map;
    }

    @Override
    public Admin getAdminById(String adminId) {
        return adminDAO.queryById(adminId);
    }

    @Override
    public ResultVO remove(String adminId) {
        ResultVO resultVO = new ResultVO();

        try {
            adminDAO.delete(adminId);
            resultVO.setStatus(true).setErrmsg("ok");
        }catch (Exception e){
            e.printStackTrace();
            resultVO.setStatus(false).setErrmsg("error");
        }

        return resultVO;
    }


}
