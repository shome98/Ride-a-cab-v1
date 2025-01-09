import { Server } from "socket.io";
import { User } from "./models/user.model.js";
import { Captain } from "./models/captain.model.js";
let io;
export function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        },
    });
    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);
        socket.on("join", async (data) => {
            const { userId, userType } = data;
            if (userType === "User") {
                await User.findByIdAndUpdate(userId, { socketId: socket.id });
            }
            else if (userType === "Captain") {
                await Captain.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });
        socket.on("update-location-captain", async (data) => {
            const { userId, location } = data;
            if (!location || location.latitude === undefined || location.longitude === undefined) {
                return socket.emit("error", { message: "Location data is a mess!!!" });
            }
            await Captain.findByIdAndUpdate(userId, {
                location: {
                    latitude: location.latitude,
                    longitude: location.longitude
                }
            });
        });
        socket.on("disconnected", () => console.log(`Client diconnected: ${socket.id}`));
    });
}
export function sendMessageToSocketId(socketId, messageObject) {
    console.log(messageObject);
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    }
    else {
        console.log("Socket is not initialized");
    }
}
