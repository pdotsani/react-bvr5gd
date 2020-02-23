import React from 'react';

import { humanReadableTime } from "../helpers/time";

export default function Message({senderUuid, sentAt, content, del}) {
  return (
    <div className="Message">
      <div className="Message__stamp">
        <span className="Message__senderUuid">{senderUuid}</span>
        <span className="Message__sentAt">{humanReadableTime(sentAt)}</span>
        <span className="Message__delete" onClick={del}>delete</span>
      </div>
      <div className="Message__content">{content}</div>
    </div>
  )
}