import { io } from 'socket.io-client'


const socket = io("https://cbpatio-production.up.railway.app/", {
  transports: ['websocket'],
});

export {socket}