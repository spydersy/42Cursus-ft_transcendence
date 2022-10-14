import React  from "react";
import io, { Socket } from "socket.io-client";
// import { SOCKET_URL } from "config";

 export const SocketValue = io("http://localhost:3001/chat");
export const SocketContext = React.createContext<Socket>(SocketValue);