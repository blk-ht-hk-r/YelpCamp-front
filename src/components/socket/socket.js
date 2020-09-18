//Used to import the connection made by the socket to all other files
import io from "socket.io-client";

//Connectiong the socket to the server
const socket = io(`${process.env.REACT_APP_API_URL}`);

export default socket;
