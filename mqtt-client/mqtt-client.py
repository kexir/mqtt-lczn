#!/usr/bin/python
# -*- coding: utf-8 -*-

# Copyright (c) 2013 Roger Light <roger@atchoo.org>
#
# All rights reserved. This program and the accompanying materials
# are made available under the terms of the Eclipse Distribution License v1.0
# which accompanies this distribution.
#
# The Eclipse Distribution License is available at
#   http://www.eclipse.org/org/documents/edl-v10.php.
#
# Contributors:
#    Roger Light - initial implementation
# qos is a parameter available on each publish call. It is one of three levels:
# 0 – at most once. This means that the system will make a best effort to deliver the message, 
# 1 – at least once. This means that the system will use storage and handshaking to ensure that the message is delivered. 
# However, in doing so it may send the same message multiple times, resulting in duplicates.
# This example shows how you can use the MQTT client in a class.

import json
import paho.mqtt.client as mqtt
import time
from datetime import datetime
from dateutil import parser
import sensor
import sys
sys.path.insert(0, '/Users/lyuqi/Downloads/DR/mqtt-lczn/common')
import conf

SERVER_HOST = conf.host
SERVER_PORT = conf.port
KEEP_ALIVE = conf.keep_alive
RETRY_LIMIT = conf.RETRY_LIMIT

def on_connect(mqttc, obj, flags, rc):
    if rc == 0:
        print("Connected to %s:%s" % (mqttc._host, mqttc._port))  
    else:
        for i in range(RETRY_LIMIT):
            rc = mqttc.connect(SERVER_HOST, SERVER_PORT, KEEP_ALIVE)
            if rc == 0:
                print("Connected to %s:%s" % (mqttc._host, mqttc._port))
                break
    return rc
    

def on_message(mqttc, obj, msg):
    print("message received: "+msg.topic+" "+str(msg.payload))
    message = json.loads(msg.payload)
    timestamp_list = message['timestamp']
    for i in range(len(timestamp_list)):
        timestamp = timestamp_list[i]
        time = parser.parse(timestamp)
        print time
    coordinate = message['coordinate']
    s = ""+str(coordinate[0])+","+str(coordinate[1])
    print s
    channel = message['channel']
    print channel

def on_publish(mqttc, obj, mid):
    print("mid: "+str(mid))
    

def on_subscribe(mqttc, obj, mid, granted_qos):
    print("Subscribed: "+str(mid)+" "+str(granted_qos))

def on_log(mqttc, obj, level, string):
    print(string)

# If you want to use a specific client id, use
# mqttc = mqtt.Client("client-id")
# but note that the client id must be unique on the broker. Leaving the client
# id parameter empty will generate a random id for you.
mqttc = mqtt.Client()
mqttc.on_connect = on_connect
mqttc.on_message = on_message
mqttc.on_publish = on_publish
mqttc.on_subscribe = on_subscribe
mqttc.on_log = on_log

rc = mqttc.connect(SERVER_HOST, SERVER_PORT, KEEP_ALIVE)
mqttc.subscribe("localization/result/one", 0)


msg_id = 0
while rc == 0:
    obs = sensor.read_static()
    channel = "one"
    # obs = sensor.read_dynamic(msg_id)
    msg_id = msg_id+1
    timestamp = []
    timestamp.append(datetime.now().__str__())
    payload = {}
    payload['observation'] = obs
    payload['channel'] = channel
    payload['timestamp'] = timestamp
    (rc, mid) = mqttc.publish("localization/observation", json.dumps(payload), qos=0)
    rc = mqttc.loop() # receive info
    time.sleep(10)


mqttc.disconnect()