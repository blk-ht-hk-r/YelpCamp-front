//Used to import the connection made by the socket to all other files
import io from "socket.io-client";

//Connectiong the socket to the server
const socket = io("http://localhost:8080");

export default socket;
