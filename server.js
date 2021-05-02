
require('dotenv').config();


const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

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
app.listen(port, () => console.log(`server running on port${port}`))
