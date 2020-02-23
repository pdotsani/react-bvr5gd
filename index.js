import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

import Message from "./Message/Message"

import { 
  sortMessagesAscending, 
  sortMessagesDescending } from "./helpers/messages";

// This is the list of messages.
import { messages } from './data.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      filteredMessages: messages,
      visible: [...messages.slice(0,10)],
      currPages: 2,
      pages: Math.floor(messages.length / 5)
    };

    document.addEventListener("scroll", this.trackScroll)
  }

  trackScroll = () => {
    const { currPages, pages } = this.state;
    const wrappedElement = document.getElementById('MessageContainer');
    if (wrappedElement.scrollHeight - wrappedElement.scrollTop === wrappedElement.clientHeight && currPages !== pages) {
      console.log('header bottom reached');
      // document.removeEventListener('scroll', this.trackScrolling);
      const idxOne = this.state.currPages * 5;
      const idxTwo = idxOne + 5;
      this.setState({ 
        visible: [...this.state.visible, ...this.state.filteredMessages.slice(idxOne, idxTwo)],
        currPages: this.state.currPages + 1
      });
      console.log(this.state);
      console.log(wrappedElement.scrollHeight);
    }
  }

  setAscendingOrder = () => {
    const { filteredMessages, currPages } = this.state;
    const ascendingOrderFiltered = sortMessagesAscending(filteredMessages);
    const idx = currPages*5;
    this.setState({ 
      filteredMessages: ascendingOrderFiltered,
      vsible: [...ascendingOrderFiltered.slice(0, idx)]
    });
  }

  setDescendingOrder = () => {
    const { filteredMessages, currPages } = this.state;
    const descendingOrderFiltered = sortMessagesDescending(filteredMessages);
    const idx = currPages*5;
    this.setState({ 
      filteredMessages: descendingOrderFiltered,
      vsible: [...descendingOrderFiltered.slice(0, idx)]
    });
  }

  render() {
    const { visible } = this.state;
    // console.log(this.state);
    return (
      <div>
        <div className="FilterContainer">
          <button 
            className="Button"
            onClick={this.setAscendingOrder}>Asc</button>
          <button 
            className="Button"
            onClick={this.setDescendingOrder}>Dsc</button>
        </div>
        <div className="MessageContainerOutter">
          <div id="MessageContainer">
          {
            visible.map((msg, idx) => 
              <Message
                key={`message-id-${idx}`}
                senderUuid={msg.senderUuid} 
                sentAt={msg.sentAt}
                content={msg.content}
              />
            ) 
          }
          </div>
        </div>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));
