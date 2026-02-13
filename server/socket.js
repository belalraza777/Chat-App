const { Server } = require('socket.io');

let io; // keep io instance
const users = {} // example { userId: socketId }

// Initialize Socket.IO
function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    // Handle socket connections
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);
        const userId = socket.handshake.query.userId; // userId from frontend
        if (userId) {
            users[userId] = socket.id; // add to object
            console.log(`User ${userId} mapped to socket ${socket.id}`);
        }

        // emit online users to all clients
        io.emit('getOnlineUsers', Object.keys(users));

        
        // handle disconnect
        socket.on('disconnect', () => {
            if (userId && users[userId]) {
                delete users[userId]; // remove from object
                io.emit('getOnlineUsers', Object.keys(users)); // emit updated online users
                console.log(` User ${userId} disconnected (socket: ${socket.id})`);
            }
        });
    });

}

// Get io instance
function getIO() {
    if (!io) throw new Error("Socket.IO not initialized!");
    return io;
}
// Get socket ID by user ID
function getReceiverSocketId(receiverId) {
    return users[receiverId];
};

module.exports = { initSocket, getIO, users, getReceiverSocketId };
