import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("New connection:", socket.id);

    socket.on("join-call", (path) => {
      console.log(`${socket.id} joined call at ${path}`);
      
      if (connections[path] === undefined) {
        connections[path] = [];
      }
      
      if (!connections[path].includes(socket.id)) {
        connections[path].push(socket.id);
        timeOnline[socket.id] = new Date();
      }

      for (let a = 0; a < connections[path].length; a++) {
        io.to(connections[path][a]).emit("user-joined", socket.id, connections[path]);
      }

      if (messages[path] !== undefined && messages[path].length > 0) {
        for (let a = 0; a < messages[path].length; ++a) {
          io.to(socket.id).emit(
            "chat-message",
            messages[path][a]["data"],
            messages[path][a]["sender"],
            messages[path][a]["socket-id-sender"]
          );
        }
      }
      
      console.log(`Room ${path} now has ${connections[path].length} users:`, connections[path]);
    });

    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });

    socket.on("chat-message", (data, sender) => {
      const [matchingRoom, found] = Object.entries(connections).reduce(
        ([room, isFound], [roomKey, roomValue]) => {
          if (!isFound && roomValue.includes(socket.id)) {
            return [roomKey, true];
          }
          return [room, isFound];
        },
        ["", false]
      );

      if (found === true) {
        if (messages[matchingRoom] === undefined) {
          messages[matchingRoom] = [];
        }

        messages[matchingRoom].push({
          sender: sender,
          data: data,
          "socket-id-sender": socket.id,
        });
        console.log("Message in room", matchingRoom, ":", sender, data);

        connections[matchingRoom].forEach((elem) => {
          io.to(elem).emit("chat-message", data, sender, socket.id);
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      
      var diffTime = timeOnline[socket.id] 
        ? Math.abs(timeOnline[socket.id] - new Date()) 
        : 0;

      var key;

      for (const [k, v] of Object.entries(connections)) {
        const index = v.indexOf(socket.id);
        
        if (index !== -1) {
          key = k;
          
          // Notify other users in the room
          connections[key].forEach((elem) => {
            if (elem !== socket.id) {
              io.to(elem).emit("user-left", socket.id);
            }
          });

          // Remove user from room
          connections[key].splice(index, 1);
          console.log(`Removed ${socket.id} from room ${key}. Remaining users: ${connections[key].length}`);

          // Delete empty rooms
          if (connections[key].length === 0) {
            delete connections[key];
            delete messages[key];
            console.log(`Room ${key} deleted (empty)`);
          }
        }
      }
      
      // Clean up
      delete timeOnline[socket.id];
    });
  });
  
  return io;
};