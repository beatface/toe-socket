"use strict";

// module requires
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// my requires

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render(index);
});

var users = [];

io.on('connection', function(socket){
    console.log("new socket id: ", socket.id);
    users.push(socket.id); // add users socket id to users array
    console.log("users: ", users);

    if (users.length%2 === 1) {
        console.log('Waiting on another player.');
    }

    socket.on('o moved', function(move){
        // console.log("from o moved: ", move);
        socket.broadcast.emit('o moved', move);
    });

    socket.on('x moved', function(move){
        // console.log('X move position: ' + move);
        socket.broadcast.emit('x moved', move);
    });

    socket.on('disconnect', function(data){
        console.log('user disconnected');
        // console.log("user disconnecting: ", socket);
        console.log("disconnect data", data);

        const disconnecting_user = users.indexOf(socket.id);
        users.splice(disconnecting_user, 1);
        console.log("now connected users are: ", users);
        io.emit('someone disconnected', '1 user left the room');
    });
});


http.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
