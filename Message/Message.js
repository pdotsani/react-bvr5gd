import React from 'react';

import { humanReadableTime } from "../helpers/time";

export default function Message({senderUuid, sentAt, content}) {
  return (
    <div className="Message">
      <div className="Message__stamp">
        <span className="Message__senderUuid">{senderUuid}</span>
        <span className="Message__sentAt">{humanReadableTime(sentAt)}</span>
      </div>
      <div className="Message__content">{content}</div>
    </div>
  )
}