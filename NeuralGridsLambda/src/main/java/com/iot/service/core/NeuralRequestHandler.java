package com.iot.service.core;

import java.util.Map;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.iot.service.core.dto.test.SNSMobilePush;

public class NeuralRequestHandler implements RequestHandler<Map<String, String>, String> {


	@Override
    public String handleRequest(Map<String, String> dataMap,  Context context) {
        context.getLogger().log("Input: " + dataMap);
		String userDeviceIdKey	=	"e4FhsEdR3yM:APA91bFno4VOARmlGbP2OK0cvRjTow1D15J3B4ix42L2xLGpski5Mhk_wdHFGtLqk5tRUhKczKLabkGdoHZE_6QDLztrEB8nIvnkKgfPO79N74asvDonLcsXJ4of81hJb3UrgbAvuQFKxR4I7NHT78y0yrw3qscLPg";
		String message	=	dataMap.get("message");
		String title	=	dataMap.get("title");
		
        send(userDeviceIdKey,message,title);
        
        // TODO: implement your handler
        return "Hello from Lambda with map!";
    }
	
	public void send(String userDeviceIdKey,String message,String title){
		SNSMobilePush	push	=	new SNSMobilePush();
		try {
			push.pushFCMNotification(userDeviceIdKey,message,title);
		} catch (Exception e){
			e.printStackTrace();
		}
	}	


}
