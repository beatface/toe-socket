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

io.on('connection', function(socket){
    // console.log('a user connected');
    // socket.on('chat message', function(msg){
    //     console.log('message: ' + msg);
    //     io.emit('chat message', {
    //         name: msg.name,
    //         message: msg.message,
    //     });
    // });
    socket.on('disconnect', function(){
        console.log('user disconnected');
        io.emit('someone disconnected', '1 user left the room');
    });
});


http.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
