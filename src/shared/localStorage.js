export function setLocalStoraToTicketForPay(ticketArr) {
  localStorage.setItem('ticket', JSON.stringify(ticketArr));
}

export function getLocalStorageTicketForPay (key) {
  return JSON.parse(localStorage.getItem(key));
}
