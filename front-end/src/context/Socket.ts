import React  from "react";
import io, { Socket } from "socket.io-client";

var socketOptions = {
    withCredentials: true,
 };
 export const SocketValue = io(process.env.REACT_APP_SOCKET_URL + "/chat", socketOptions);
export const SocketContext = React.createContext<Socket>(SocketValue);
 export const SocketGameValue = io(process.env.REACT_APP_SOCKET_URL + "/game", socketOptions);
export const SocketGameContext = React.createContext<Socket>(SocketGameValue);
export const OnlineSocket = io(process.env.REACT_APP_SOCKET_URL + "/online", socketOptions);
export const OnlineContextSocket = React.createContext<Socket>(OnlineSocket);