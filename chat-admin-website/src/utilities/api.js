// // src/utilities/api.js

// // --- Simulated Server State ---
// const serverState = {
//   status: 'enabled', // Initial status of the form (enabled)
// };

// const API_BASE = import.meta.env.VITE_NODE_BASE_URL + "/api";

// // --- 1. API Utilities (Simulated API calls) ---

// /**
//  * Fetches the current form status (simulates initial GET API call).
//  * This is still needed for the initial load of the Agent and Client.
//  * @returns {Promise<string>} The status string ('enabled' or 'disabled').
//  */
// export const getFormStatus = async () => {
//   await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay
//   console.log(`[API GET] Initial Status checked: ${serverState.status}`);
//   return serverState.status; 
// };

// /**
//  * Posts the new form status to the server (simulates POST API call from Agent).
//  * After updating the state, it triggers the WebSocket broadcast.
//  * @param {string} status 'enable' or 'disable'.
//  * @returns {Promise<boolean>} True if the update was successful.
//  */
// export const postFormStatus = async (status) => {
//   await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay

//   if (status === 'enable' || status === 'disable') {
//     const newStatus = status === 'enable' ? 'enabled' : 'disabled';
//     serverState.status = newStatus; // Update the simulated server state
    
//     WebSocketSimulator.broadcast(newStatus);

//     console.log(`[API POST] Agent set status to: ${serverState.status} and Broadcasted.`);
//     return true; // Simulate a successful API call
//   }

//   console.error("[API POST] Invalid status received.");
//   return false; // Simulate a failed API call for invalid status
// };
