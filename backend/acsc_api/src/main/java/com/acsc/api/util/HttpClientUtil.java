package com.acsc.api.util;

import com.acsc.commons.vo.ResultVO;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
@Slf4j
public class HttpClientUtil {
    public static ResultVO sendUrl(String httpurl, String data) {
        ResultVO resultvo = new ResultVO();
        try {
            CloseableHttpClient httpClient = HttpClients.createDefault();

            HttpPost httpPost = new HttpPost(httpurl);
            httpPost.addHeader("Content-Type", "application/x-www-form-urlencoded");
            httpPost.setEntity(new StringEntity(data,"UTF-8")); //防止中文乱码

            CloseableHttpResponse response = httpClient.execute(httpPost);
            System.out.println(response.getStatusLine().getStatusCode() + "\n");
            HttpEntity entity = response.getEntity();
            String responseContent = EntityUtils.toString(entity, "UTF-8");
            System.out.println(responseContent);
            response.close();
            httpClient.close();
            resultvo.setStatus(true).setErrmsg("登录请求发送成功").setData(responseContent);
        }catch (Exception e){
            log.info("httpclient发送登录请求失败！||"+e.getMessage());
            resultvo.setStatus(false).setErrmsg("登录请求发送失败");

        }
        return resultvo;
    }

}
