// import { useState, useEffect } from "react";
// import { listenAgentsUpdate, listenCustomersUpdate } from "../../../../utilities/socket.js";

// // Hook for real-time active agents
// export const useActiveAgentsRealtime = () => {
//   const [agents, setAgents] = useState([]);

//   useEffect(() => {
//     listenAgentsUpdate(setAgents);       // Subscribe to agents update
//     return () => {};                      // Socket cleanup handled inside socket.js
//   }, []);

//   return agents;
// };

// // Hook for real-time online customers
// export const useOnlineCustomersRealtime = () => {
//   const [customers, setCustomers] = useState([]);

//   useEffect(() => {
//     listenCustomersUpdate(setCustomers);  // Subscribe to customers update
//     return () => {};
//   }, []);

//   return customers;
// };
