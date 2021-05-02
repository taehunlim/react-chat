
require('dotenv').config();


const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

// socket
const http = require('http').createServer(app);


app.use(express.json());
app.use(express.urlencoded({extended: false}));

const io = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});

const port = process.env.PORT;
http.listen(port, () => console.log(`server running on port${port}`))

// socket
io.on('connection', socket => {

    const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
    const { roomId } = socket.handshake.query;
    socket.join(roomId);
  
    // Listen for new messages
    socket.on("newChatMessage", (data) => { //on: 데이터를 받을때
      io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data); //emit: 데이터를 보낼때
    });
  
    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
      socket.leave(roomId);
    });
});
