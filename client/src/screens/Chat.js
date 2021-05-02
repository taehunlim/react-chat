import React, {useState, useEffect} from 'react';
import socketio from 'socket.io-client';
import TextField from '@material-ui/core/TextField';

const Chat = () => {

    const [currentSocket, setCurrentSocket] = useState();

    useEffect(() => {
      setCurrentSocket(socketio("/"));
    }, []);

    return (
        <div>
            chatss
        </div>
    )
}

export default Chat;