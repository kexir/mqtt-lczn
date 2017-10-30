let express = require('express');
let app = express();
let http = require('http');

let socket_io = require('socket.io');
let io = socket_io();
let mqtt = require('mqtt');
let client  = mqtt.connect('mqtt://neptune.usc.edu');
let mqttService = require('./services/MqttService')(client, io);

let server = http.createServer(app);
io.attach(server);
server.listen(4200);