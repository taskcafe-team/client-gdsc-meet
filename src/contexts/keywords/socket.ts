import { io } from 'socket.io-client';

class SocketIOManager {
    static readonly URL = 'https://huge-seasnail-visually.ngrok-free.app'; // Define the socket.io URL

    private static socket = io(SocketIOManager.URL, {
        autoConnect: false,
    });

    static getSocket = SocketIOManager.socket;

    static connect() {
        SocketIOManager.socket.connect();
    }

    static disconnect() {
        SocketIOManager.socket.disconnect();
    }

    static ping(callback) {
        return SocketIOManager.socket.on("hello",(re)=>{
            callback(re)
        });
    }
}

export default SocketIOManager;