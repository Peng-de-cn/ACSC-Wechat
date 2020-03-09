package com.acsc.manager.controller;

import com.acsc.commons.vo.ResultVO;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@RestController
@RequestMapping("/file")
public class FileController {

    @Value("${upload.filePath}")
    private String uploadBasePath;


    /**
     * 图片上传
     * @param file
     * @param request
     * @return
     */
    @RequestMapping("uploadImg")
    public Map<String,Object> uploadImgEditor(MultipartFile file, HttpServletRequest request){



        HashMap<String, Object> map = new HashMap<>();

        //String basePath = request.getServletContext().getRealPath("/uploadFiles");

        String uploadPath = File.separator + "acsc" + File.separator + "activity";

        String path = upload(file, uploadPath);

        if("error".equals(path)){
            map.put("errno",1);
            map.put("data",path);
        }else{
            map.put("errno",0);
            map.put("data",path);
        }


        return map;
    }


    /**
     * 图片上传
     * @param files
     * @param request
     * @return
     */
    @RequestMapping("uploadImgEditor")
    public Map<String,Object> uploadImgEditor(@RequestParam("files") List<MultipartFile> files, HttpServletRequest request){

        System.out.println(files);

        HashMap<String, Object> map = new HashMap<>();
        HashMap<String, Object> data = new HashMap<>();

        ArrayList<String> urls = new ArrayList<>();

        for (MultipartFile file : files) {

            //String basePath = request.getServletContext().getRealPath("/uploadFiles");

            String uploadPath = File.separator + "acsc" + File.separator + "activity";

            System.out.println(uploadPath);

            String path = upload(file, uploadPath);

            if( !"error".equals(path) ){
                System.out.println(path);
                urls.add(path);
            }

        }

        map.put("errno",0);
        map.put("data",urls);

        return map;
    }

    @RequestMapping("delUploadFile")
    public ResultVO delUploadFile(String path, HttpServletRequest request){

        String basePath = request.getServletContext().getRealPath("/uploadFiles");

        System.out.println("path: "+path);
        System.out.println("basePath: "+basePath);

        String filePath = path.replace("/uploadFiles", basePath);



        System.out.println("basePath: " + basePath);

        File file = new File(filePath);

        ResultVO resultVO = new ResultVO();

        if(file.delete()){
            System.out.println("文件 "+path+" 已删除");
            resultVO.setStatus(true).setErrmsg("ok");
        }else {
            resultVO.setStatus(false).setErrmsg("删除失败");

        }

        return resultVO;

    }

    /**
     *
     * @Description:保存图片并且生成缩略图
     * @param file 图片文件
     * @param uploadPath 上传目录
     * @return
     */
    public String upload(MultipartFile file, String uploadPath) {

        try {

            // 获取文件名
            String fileName = file.getOriginalFilename();
            //System.out.println("上传的文件名为：" + fileName);

            // 获取文件的后缀名
            String suffixName = fileName.substring(fileName.lastIndexOf("."));
            System.out.println("文件的后缀名为：" + suffixName);

            //文件重命名
            String uploadName = UUID.randomUUID().toString().replace("-", "") + suffixName;

            String savePath = uploadPath + File.separator + uploadName;

            //String path = basePath + savePath;
            String path = uploadBasePath + savePath;

            //data.put("src", "/uploadFiles" + savePath);
            File dest = new File(path);
            // 检测是否存在目录
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();// 新建文件夹
            }
            file.transferTo(dest);// 文件写入

            return  "http://images.yangz.vip" + savePath;

        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "error";

    }


}
