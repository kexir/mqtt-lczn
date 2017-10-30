import json
from promise import Promise
import paho.mqtt.client as mqtt
import estimate
import datetime
from collections import deque
import sys
sys.path.insert(0, '/Users/lyuqi/Downloads/DR/mqtt-lczn/common')
import conf
import yaml
SERVER_HOST = conf.host
SERVER_PORT = conf.port
KEEP_ALIVE = conf.keep_alive

queue = deque()

def on_connect(mqttc, obj, flags, rc):
	print("connected! rc = "+str(rc))

def on_message(mqttc, obj, msg):
	print ("estimate start")
	payload = json.loads(msg.payload)
	channel = payload['channel']
	obs = payload['observation']
	result = estimate.estimate(obs)
	print(list(result))
	message = {}
	message['channel'] = channel
	message['coordinate'] = result
	timestamp = payload['timestamp']
	mid = datetime.datetime.now()
	timestamp.append(mid.__str__())
	message['timestamp'] = timestamp
	(rc, mid) = mqttc.publish("localization/result/"+channel, json.dumps(message), qos=0)

def on_publish(mqttc, obj, mid):
	print("mid: "+str(mid))

def on_subscribe(mqttc, obj, mid, granted_qos):
	print("Subscribed: "+str(mid)+" "+str(granted_qos))


mqttc = mqtt.Client()
mqttc.on_connect = on_connect
mqttc.on_message = on_message
mqttc.on_publish = on_publish
mqttc.on_subscribe = on_subscribe

mqttc.connect(SERVER_HOST, SERVER_PORT, KEEP_ALIVE)
mqttc.subscribe("localization/observation/#", 0)

mqttc.loop_forever()