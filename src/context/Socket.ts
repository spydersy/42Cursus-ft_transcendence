import React, {createContext}  from "react";
import io, { Socket } from "socket.io-client";


var socketOptions = {
    withCredentials: true,
 };
 export const SocketValue = io("http://localhost:3001/chat", socketOptions);
export const SocketContext = React.createContext<Socket>(SocketValue);
 export const SocketGameValue = io("http://localhost:3001/game", socketOptions);
export const SocketGameContext = React.createContext<Socket>(SocketGameValue);
// export const notifSocket = io("http://localhost:3001/notif", socketOptions);
// export const notifContextSocket = React.createContext<Socket>(notifSocket);