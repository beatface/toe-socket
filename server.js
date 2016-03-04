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
    socket.join('/poop');
    console.log(socket.id);
    console.log(socket.nsp.adapter.rooms);
    socket.on('o moved', function(move){
        // console.log('O move position: ' + move);
        socket.to('/poop').emit('o moved', {
            count: move.count,
            move: move.move
        });
    });
    socket.on('x moved', function(move){
        // console.log('X move position: ' + move);
        socket.broadcast.emit('x moved', {
            count: move.count,
            move: move.move
        });
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
        io.emit('someone disconnected', '1 user left the room');
    });
});


http.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
