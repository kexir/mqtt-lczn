let redisClient = require('../modules/redisClient');
const TIMEOUT_IN_SECONDS = 3600;

module.exports = function(client, io) {
    let subscription = [];
    // map from socketId to sessionId
    let socketToChannel = [];
    const prefix = 'localization/result/';
    io.on('connection', socket => {
        let channel = socket.handshake.query['subscribe'];
        channel = prefix+channel;
        console.log('handshake channel '+channel+' '+'socket id '+ socket.id);
        socketToChannel[socket.id] = channel;
        if(channel in subscription) {
            subscription[channel].push(socket.id);
        } else {
            let clients = [];
            clients.push(socket.id);
            subscription[channel] = clients
        }
        socket.on('disconnect', function() {
            let channel = socketToChannel[socket.id];
            console.log('socket ' + socket.id + ' disconnected.');
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
        client.subscribe('localization/result/#');
    });

    client.on('message', function (channel, message) {
        // console.log(channel);
        // console.log(message.toString());
        if(channel in subscription) {
            forwardEvents(channel, message);
        }
    });

    function forwardEvents(channel, message) {
        let participants = subscription[channel];
        for (let i = 0; i < participants.length; i++) {
            console.log('forward message to participant '+participants[i]);
            console.log(message.toString());
            io.to(participants[i]).emit('message', message.toString());
        }
    }
};