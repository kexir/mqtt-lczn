let redisClient = require('../modules/redisClient');
const TIMEOUT_IN_SECONDS = 3600;

module.exports = function(client, io) {
    let subscription = [];
    // map from socketId to sessionId
    let socketToChannel = [];
    io.on('connection', socket => {
        let channel = socket.handshake.query['subscribe'];
        console.log(channel);
        console.log(socket.id);
        socketToChannel[socket.id] = channel;
        subscription[channel].push(socket.id);

        socket.on('disconnect', function() {
            let channel = socketToChannel[socket.id];
            console.log('socket ' + socket.id + 'disconnected.');
            if (channel in subscription) {
                let participants = subscription[channel];
                let index = participants.indexOf(socket.id);
                if (index >= 0) {
                    participants.splice(index, 1);
                    if (participants.length == 0) {
                        console.log("last listener left.");
                    }
                }
            }
        });
    });

    client.on('connect', function () {
        console.log("connect to neptune.usc.edu");
        client.subscribe('localization/observation/#');
    });

    client.on('message', function (channel, message) {
        // message is Buffer
        console.log(channel);
        console.log(message.toString());
        if(channel in subscription) {
            forwardEvents(channel, message);
        }
        redisClient.get(channel, function(data) {
            if (data) {
                console.log("add message to existing session");
                data.append(message);
                redisClient.set(channel, data, redisClient.redisPrint);
            } else {
                console.log("creating new session");
                redisClient.set(channel, message, redisClient.redisPrint);
                redisClient.expire(key, TIMEOUT_IN_SECONDS);
            }
        });
    });

    function forwardEvents(channel, message) {
        let participants = subscription[channel];
        for (let i = 0; i < participants.length; i++) {
            io.to(participants[i]).emit('message', message);
        }
    }
};