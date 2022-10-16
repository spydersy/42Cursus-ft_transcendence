import React  from "react";
import io, { Socket } from "socket.io-client";


// var socketOptions = {
//     withCredentials: true,
//  };
 export const SocketValue = io("http://localhost:3030" );
export const SocketContext = React.createContext<Socket>(SocketValue);