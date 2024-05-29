import { io } from "../app"; // Importing the io instance from the main app file

// Function to notify users about a bid update
const notifyUsers = (itemId, bidAmount) => {
  // Emitting an 'update' event through socket.io with the itemId and bidAmount
  io.emit("update", { itemId, bidAmount });
};

export default { notifyUsers }; // Exporting the notifyUsers function as a module
