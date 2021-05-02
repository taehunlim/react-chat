
require('dotenv').config();


const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

// socket
const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.use(express.json());
app.use(express.urlencoded({extended: false}));

if(process.env.NODE_ENV === "development") {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }));

    app.use(morgan('dev'));
}

const port = process.env.PORT;
http.listen(port, () => console.log(`server running on port${port}`))

// socket
io.on('connection', socket => {
    socket.on('newUser', data => { //on: 데이터를 받을때
        io.emit('enter', data) //emit: 데이터를 보낼때
    });

    socket.on('message', data => {
        console.log(data)
        io.emit('upload', data)
    });

    socket.on('leaveUser', nick => {
        io.emit('out', nick)
    })
});
