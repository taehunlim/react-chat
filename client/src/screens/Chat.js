import React, {useState} from 'react';

const Chat = () => {

    const [roomName, setRoomName] = useState("");

    const handleRoomNameChange = (e) => {
      setRoomName(e.target.value);
    };

    return (
      <div className="home-container">
        <input
          type="text"
          placeholder="Room"
          value={roomName}
          onChange={handleRoomNameChange}
          className="text-input-field"
        />
        <a 
          href={`/${roomName}`} 
          className="enter-room-button"
        >
          Join room
        </a>
      </div>
    )
}

export default Chat;