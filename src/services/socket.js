import { io } from 'socket.io-client'


const socket = io("https://cbpatio.onrender.com/", {
  transports: ['websocket'],
});

export {socket}