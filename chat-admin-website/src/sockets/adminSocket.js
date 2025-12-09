// // src/sockets/adminSocket.js
// import { io } from "socket.io-client";

// const SOCKET_URL = import.meta.env.VITE_NODE_BASE_URL;

// const socket = io(SOCKET_URL, {
//   transports: ["websocket"],
//   autoConnect: false, // connect manually
// });

// export const connectSocket = (callback) => {
//   if (!socket.connected) {
//     socket.connect();
//     socket.on("connect", () => {
//       console.log("Connected!", socket.id);
//       if (callback) callback();
//     });
//     console.log("[DEBUG] Admin socket connecting...");
//   }
// };

// export const disconnectSocket = () => {
//   if (socket.connected) {
//     socket.disconnect();
//     console.log("[DEBUG] Admin socket disconnected");
//   }
// };

// // Listen online agents
// export const onAgentOnline = (callback) => {
//   if (socket) {
//     socket.on("agent_online", (data) => {
//     // socket.join(`agent_${agent_id}`);
//       console.log("[DEBUG] agent_online:", data);
//       callback(data);
//     });
//   }
// };
// export const onAgentOffline = (callback) => {
//   if (socket) {
//     socket.on("agent_offline", (data) => {
//       console.log("[DEBUG] agent_offline:", data);
//       callback(data);
//     });
//   }
// };

// export const onCustomerOnline = (callback) => {
//   if (socket) {
//     socket.on("customer_online", (data) => {
//       console.log("[DEBUG] customer_online:", data);
//       callback(data);
//     });
//   }
// };
// export const onCustomerUpdate = (callback)=>{
//     if (socket) {
//     socket.on("customer_status_update", (data) => {
//       console.log("[DEBUG] customer_status_update :", data);
//       callback(data);
//     });
//   }
// }

// export const onCustomerOffline = (callback) => {
//   if (socket) {
//     socket.on("customer_offline", (data) => {
//       console.log("[DEBUG] customer_offline:", data);
//       callback(data);
//     });
//   }
// };

// // Listen new assignment
// export const onNewAssignment = (callback) => {
//   if (socket) {
//     socket.on("new_assignment", () => {
//       console.log("[DEBUG] new_assignment received");
//       callback();
//     });
//   }
// };



// export default socket;


// src/sockets/adminSocket.js
import { io } from "socket.io-client";
const SOCKET_URL = import.meta.env.VITE_NODE_BASE_URL;

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export const connectSocket = (callback) => {
  if (!socket.connected) {
    socket.connect();
    socket.on("connect", () => {
      console.log("[admin socket] connected:", socket.id);
      if (callback) callback();
    });
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
    console.log("[admin socket] disconnected");
  }
};

export const onAgentOnline = (callback) => {
  socket.on("agent_online", (data) => {
    console.log("[admin socket] agent_online:", data);
    callback(data);
  });
};
export const onAgentOffline = (callback) => {
  socket.on("agent_offline", (data) => {
    console.log("[admin socket] agent_offline:", data);
    callback(data);
  });
};

export const onCustomerOnline = (callback) => {
  socket.on("customer_online", (data) => {
    console.log("[admin socket] customer_online:", data);
    callback(data);
  });
};
export const onCustomerOffline = (callback) => {
  socket.on("customer_offline", (data) => {
    console.log("[admin socket] customer_offline:", data);
    callback(data);
  });
};

export const onNewAssignment = (callback) => {
  socket.on("new_assignment", (data) => {
    console.log("[admin socket] new_assignment:", data);
    callback(data);
  });
};

export default socket;
