import { customerSocketMap } from "./maps.js";

export const customerSocketHandler = (io, socket) => {
  socket.on("customer_connected", ({ temp_user_id }) => {
    customerSocketMap[temp_user_id] = socket.id;
    console.log("Customer connected:", temp_user_id, socket.id);
  });

  socket.on("disconnect", () => {
    for (const key in customerSocketMap) {
      if (customerSocketMap[key] === socket.id) {
        delete customerSocketMap[key];
        break;
      }
    }
  });
};
