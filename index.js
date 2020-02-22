import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

import Message from "./Message/Message"

// This is the list of messages.
import { messages } from './data.json';

class App extends Component {
  render() {
    return (
      <div>
      {
        messages.map((msg, idx) => 
          <Message 
            senderUuid={msg.senderUuid} 
            sentAt={msg.sentAt}
            content={msg.content}
          />
        ) 
      }
      </div>)
  }
}

render(<App />, document.getElementById('root'));
