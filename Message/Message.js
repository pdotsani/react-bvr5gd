import React from 'react';

import { humanReadableTime } from "../helpers/time";

export default function Message({senderUuid, sentAt, content}) {
  return (
    <div>
      <span className="Message__senderUuid">{senderUuid}</span>
      <span className="Message__sentAt">{humanReadableTime(sentAt)}</span>
      <span className="Message__content">{content}</span>
    </div>
  )
}