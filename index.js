import React, { Component } from 'react';
import { render } from 'react-dom';
import BottomScrollListener from 'react-bottom-scroll-listener';
import './style.css';

import Message from "./Message/Message"

import { 
  sortMessagesAscending, 
  sortMessagesDescending 
} from "./helpers/messages";

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
  }

  scrollDown = () => {
    const { currPages, pages, visible, filteredMessages } = this.state;
    if(currPages !== pages) {
      const newCurr = currPages + 1;
      const currIdx = currPages * 5;
      const idx = newCurr * 5;
      this.setState({ 
        visible: [...visible, ...filteredMessages.slice(currIdx, idx)],
        currPages: newCurr
      });
    }
  }

  deleteMessage = (idx, msg) => {
    const { visible, filteredMessages } = this.state;
    const newFilteredMessages = filteredMessages.filter(fmsg =>
      fmsg.sentAt !== msg.sentAt
    );
    this.setState({
      filteredMessages: newFilteredMessages,
      visible: [...visible.slice(0, idx), ...visible.slice(idx + 1)] 
    });
  }

  setAscendingOrder = () => {
    const { filteredMessages, currPages } = this.state;
    const ascendingOrderFiltered = sortMessagesAscending(filteredMessages);
    const idx = currPages * 5;
    this.setState({ 
      filteredMessages: ascendingOrderFiltered,
      visible: [...ascendingOrderFiltered.slice(0, idx)]
    });
  }

  setDescendingOrder = () => {
    const { filteredMessages, currPages } = this.state;
    const descendingOrderFiltered = sortMessagesDescending(filteredMessages);
    const idx = currPages * 5;
    this.setState({ 
      filteredMessages: descendingOrderFiltered,
      visible: [...descendingOrderFiltered.slice(0, idx)]
    });
  }

  render() {
    const { visible } = this.state;
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
        <BottomScrollListener onBottom={this.scrollDown}>
          {scrollRef =>(
            <div 
              className="MessageContainerOutter"
              ref={scrollRef}>
              <div className="MessageContainer">
                {
                  visible.map((msg, idx) => 
                    <Message
                      key={`message-id-${idx}`}
                      senderUuid={msg.senderUuid} 
                      sentAt={msg.sentAt}
                      content={msg.content}
                      del={this.deleteMessage.bind(this, idx, msg)} />
                  ) 
                }
              </div>
            </div>
            )
          }
        </BottomScrollListener>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));
