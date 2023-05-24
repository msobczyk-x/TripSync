
import {io} from "socket.io-client";
export const socket = io("http://192.168.1.24:4000", 
{
    reconnection:true,
    reconnectionDelay: 5000,
    autoConnect: false,
}
)
