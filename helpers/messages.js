
export function sortMessagesAscending(messages) {
  return messages.sort((a, b) => Date.parse(a.sentAt) - Date.parse(b.sentAt));
}

export function sortMessagesDescending(messages) {
  return messages.sort((a, b) => Date.parse(b.sentAt) - Date.parse(a.sentAt));
}