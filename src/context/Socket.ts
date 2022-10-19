import React  from "react";
import io, { Socket } from "socket.io-client";


var socketOptions = {
    withCredentials: true,
 };
 export const SocketValue = io("10.12.2.4:3001", socketOptions);
export const SocketContext = React.createContext<Socket>(SocketValue);