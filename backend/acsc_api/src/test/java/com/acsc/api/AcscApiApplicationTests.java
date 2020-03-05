package com.acsc.api;

import com.acsc.api.service.ActivityService;
import com.acsc.api.service.FavoriteService;
import com.acsc.api.service.UserService;
import com.acsc.commons.entity.User;
import com.acsc.commons.vo.ResultVO;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.UUID;

@SpringBootTest(classes = AcscApiApplication.class)
@RunWith(SpringRunner.class)
class AcscApiApplicationTests {
    @Autowired
    private UserService userService;
    @Autowired
    private ActivityService activityService;
    @Autowired
    private FavoriteService favoriteService;


    void contextLoads() {
        User user = new User();
        user.setAddress("henan").setAvatar("https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1649544706,2823422000&fm=26&gp=0.jpg").setBirthday(new Date()).setClubId("4").setCreateTime(new Date()).setEmail("8988888@qq.com").setFirstName("liu").setLastName("jiahui").setGender(1).setMobile("123321123").setUserId(UUID.randomUUID().toString())
                .setVipLevel("2").setVipNum("3244").setWechatName("gjkiuu").setWechatNum("gjhfjidh");
        ResultVO resultVO = userService.insertUser(user);
        System.out.println(resultVO);
    }
    @Test
    void testacticity() {
        ResultVO resultVO = activityService.getActivityList(1, 2,"create_time");
        System.out.println(resultVO);
    }
    @Test
    void testdeleteFavorite() {
        ResultVO resultVO = favoriteService.deleteFavorite("ssss","sssss");
        System.out.println(resultVO);
    }

}
