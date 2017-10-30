This project will simulate localization process in EEB building

Steps:

step1: start redis server. If you are using MAC, simply type redis-server in terminal

step2: start mqtt server. cd mqtt-server, then type python mqtt-server.py
 
step3: start location publisher. cd mqtt-client, then type python mqtt-client.py
  
step4: start to subscribe estimate result. cd lczn-server, then type python mqtt-subscribe.py 

step5: start to test executor server by cd lczn-server, then send a post request http://127.0.0.1:5000/get-location


I haven't finish the interaction between browser anf server, so the executor-server.py can only be tested using tools like "Postman"

mlb folder contains matlab code you sent to me before

I collect wifi RSS in mqtt-client/collect_data folder. I measure the Wifi RSS in front of office 401-486

work flow:
Assume I have already know the location of AP and write in configuration file

                                    mqtt-server 
                                    /       \
                           /                        \
                    /                                       \
                sensor                                 lczn-client
         collect user location                         subscribe user location and save result in redis
         
         browser(lczn-client) <==> lczn-server(executor-server.py) read data from redis
                
                                              


