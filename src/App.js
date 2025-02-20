import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// const socket = io('http://localhost:3000/');

const App = () => {
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    // socket.on('updateGifts', (updatedGifts) => {
    //   setGifts(updatedGifts);
    // });

    fetch('http://localhost:3000/gifts', {
      credentials: 'omit',
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const toggleCheck = (id) => {
    // socket.emit('toggleCheck', id);
  };

  return (
    <div>
      {gifts.map(gift => (
        <div key={gift._id}>
          <a href={gift.link}>{gift.name}</a>
          <input
            type="checkbox"
            checked={gift.checked}
            onChange={() => toggleCheck(gift.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default App;