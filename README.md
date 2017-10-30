This project will simulate localization process in EEB building

Project Structure:
mqtt-client  

	Function: publish RF observations to mqtt-server every 60s. (fake random data read from sensor.py) 
	
	Payload have 4 attributes: message id(‘msg_id’),  observation(3 RF obs), channel id(client id),  timestamp(time of sending this request), ALG(which estimate algorithm is used)

mqtt-server 
	
	Function: estimate location received from mqtt-client, and then publish estimate result 
	
	Payload have 4 attributes: message id(‘msg_id’), channel id(client id),  coordinate(estimate location), timestamp(time of finish estimating observation)

lczn-server 
	
	Function: receive estimate location from mqtt-server, send it to browser or mobile via socket.io 
	
	Detail: record a list of clients who subscribe to certain channel. On message received from mqtt-server, forward estimate result to all the clients(browser or mobile) through web socket 
	
	Why: I have tried several other options before jumping to this solution. Initially, I tried to use javascript version of paho-mqtt  in browser which utilized web socket connection. But it seems that our mitt broker “neptune.usc.edu” doesn’t support web socket connection. So, I stick to mqtt default port 1883 and switch to MQTT.js, subscribe localization result using Node.js server.

lczn-client 

	Function: visualized estimate result using react+highcharts 
	
	How to use: select a channel id you wish to connect. Then browser will update itself after receiving new position.

How to Run

I run this application in Mac. 

install redis: 

	brew install redis
install react: 

	npm install -g create-react-app
install numpy: 

	pip install numpy
install paho.mqtt: 

	pip install paho-mqtt
	
In Mac environment: open 5 terminal window

start a redis server:
 
	$redis-server
start mqtt-server:  

	$cd mqtt-server  
	$python mqtt-server.py
start lczn-server: 

	$cd lczn-server 
	$npm install 
	$npm start
start mqtt-client  

	$cd mqtt-client 
	$python mqtt-client.py
start lczn-client  

	$cd lczn-client 
	$npm install 
	$npm start