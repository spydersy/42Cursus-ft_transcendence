import React  from "react";
import io, { Socket } from "socket.io-client";


var socketOptions = {
    withCredentials: true,
 };
 export const SocketValue = io("http://localhost:3001/chat", socketOptions);
export const SocketContext = React.createContext<Socket>(SocketValue);
export const notifSocket = io("http://localhost:3001/notif", socketOptions);
export const notifContextSocket = React.createContext<Socket>(notifSocket);