import express, { json } from "express"; // Importing express and its json middleware
import { createServer } from "http"; // Importing createServer function from http module to create an HTTP server
import socketIo from "socket.io"; // Importing socket.io for real-time communication
import cors from "cors"; // Importing CORS middleware for cross-origin requests
import morgan from "morgan"; // Importing morgan for logging HTTP requests
import { sequelize } from "./models"; // Importing sequelize instance for database connection
import userRoutes from "./routes/user.route"; // Importing user-related routes
import itemRoutes from "./routes/item.route"; // Importing item-related routes
import bidRoutes from "./routes/bid.route"; // Importing bid-related routes
import notificationRoutes from "./routes/notification.route"; // Importing notification-related routes
import { notifyUsers } from "./services/notification.service"; // Importing notification service

const app = express(); // Initializing express application
const server = createServer(app); // Creating an HTTP server using the express app
const io = socketIo(server); // Initializing socket.io with the HTTP server

app.use(cors()); // Enabling CORS for all routes
app.use(morgan("dev")); // Setting up morgan to log HTTP requests in 'dev' format
app.use(json()); // Enabling express to parse JSON bodies in requests

// Setting up route handlers
app.use("/users", userRoutes); // Routes for user-related operations
app.use("/items", itemRoutes); // Routes for item-related operations
app.use("/items/:itemId/bids", bidRoutes); // Routes for bid-related operations on specific items
app.use("/notifications", notificationRoutes); // Routes for notification-related operations

// Handling socket.io connections
io.on("connection", (socket) => {
  console.log("New client connected"); // Log when a new client connects
  socket.on("disconnect", () => {
    console.log("Client disconnected"); // Log when a client disconnects
  });
});

const PORT = process.env.PORT || 3000; // Defining the port on which the server will run

// Synchronizing sequelize models with the database and starting the server
sequelize.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log that the server is running
  });
});

export default { io }; // Exporting the io instance for use in other modules
