
require('dotenv').config();


const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const { userInfo } = require('os');

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

    console.log("%s client connected", socket.id)

    // Listen for new messages
    socket.on("newChatMessage", (data) => { //on: 데이터를 받을때

      console.log("Message from %s", data)

      io
        .in(roomId)
        .emit(NEW_CHAT_MESSAGE_EVENT, data); //emit: 데이터를 보낼때

        // io.emit : 접속된 모든 클라이언트 에게
        // socket.emit : 메세지를 전송한 클라이언트에게만 
        // socket.broadcast.emit :  메세지를 전송한 클라이언트를 제외한 모두에게
        // io.to(id).emit : 특정 클라이언트에게만
    });
  
    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
      console.log("Client disconnected")

      socket.leave(roomId);
    });
});

const getApiAndEmit = socket => {
  const response = new Date();
  socket.emit("FromAPI", response)
};
