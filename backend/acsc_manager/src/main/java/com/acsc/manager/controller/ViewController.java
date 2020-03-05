package com.acsc.manager.controller;


import com.acsc.commons.entity.Activity;
import com.acsc.commons.entity.Admin;
import com.acsc.commons.entity.Club;
import com.acsc.commons.entity.Word;
import com.acsc.manager.service.ActivityService;
import com.acsc.manager.service.ClubService;
import com.acsc.manager.service.UserService;
import com.acsc.manager.service.WordService;
import org.apache.shiro.SecurityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/view")
public class ViewController {

    @Resource
    private ActivityService activityService;

    @Resource
    private ClubService clubService;

    @Resource
    private UserService userService;

    @Resource
    private WordService wordService;

    @RequestMapping("index")
    public ModelAndView index(HttpServletRequest request){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("index");
        Admin admin = (Admin) SecurityUtils.getSubject().getPrincipal();
        request.getSession().setAttribute("admin", admin);
        return modelAndView;

    }

    @RequestMapping("welcome")
    public ModelAndView welcome(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("welcome");
        return modelAndView;

    }

    @RequestMapping("login")
    public ModelAndView login(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("login");
        return modelAndView;

    }

    @RequestMapping("userList")
    public ModelAndView userList(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("user/user-list");
        modelAndView.addObject("clubs",clubService.getAllClub());
        return modelAndView;

    }

    @RequestMapping("userAdd")
    public ModelAndView userAdd(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("user/user-add");
        modelAndView.addObject("clubs",clubService.getAllClub());
        return modelAndView;

    }

    @RequestMapping("userUpdate")
    public ModelAndView userUpdate(String userId){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("user/user-update");
        modelAndView.addObject("user",userService.getUserById(userId ));
        modelAndView.addObject("clubs",clubService.getAllClub());
        return modelAndView;

    }

    @RequestMapping("activityList")
    public ModelAndView activityList(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("activity/activity-list");
        modelAndView.addObject("clubs",clubService.getAllClub());
        return modelAndView;

    }

    @RequestMapping("activityAdd")
    public ModelAndView activityAdd(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("activity/activity-add");
        modelAndView.addObject("clubs",clubService.getAllClub());
        return modelAndView;

    }

    @RequestMapping("activityUpdate")
    public ModelAndView activityUpdate(String activityId){

        Activity activity = activityService.getActivityById(activityId);

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("activity/activity-update");
        modelAndView.addObject("activity",activity);
        modelAndView.addObject("clubs",clubService.getAllClub());
        return modelAndView;

    }

    @RequestMapping("usersForActivity")
    public ModelAndView usersForActivity(String activityId, String title){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("activity/user-list");
        modelAndView.addObject("activityId",activityId);
        modelAndView.addObject("title",title);
        return modelAndView;

    }

    @RequestMapping("clubList")
    public ModelAndView clubList(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("club/club-list");
        return modelAndView;

    }

    @RequestMapping("clubAdd")
    public ModelAndView clubAdd(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("club/club-add");
        return modelAndView;

    }

    @RequestMapping("clubUpdate")
    public ModelAndView clubUpdate(String clubId){

        Club club = clubService.getClubById(clubId);

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("club/club-update");
        modelAndView.addObject("club",club);

        return modelAndView;

    }

    @RequestMapping("wordList")
    public ModelAndView wordList(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("word/word-list");
        return modelAndView;
    }

    @RequestMapping("wordAdd")
    public ModelAndView wordAdd(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("word/word-add");
        return modelAndView;
    }

    @RequestMapping("wordUpdate")
    public ModelAndView wordUpdate(String wordId){

        Word word = wordService.getWordById(wordId);

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("word/word-update");
        modelAndView.addObject("word",word);
        return modelAndView;
    }



}
