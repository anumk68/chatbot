// // src/webSocket.js
// const WebSocketService = (() => {
//   let socket = null;
//   const listeners = new Set();

//   const connect = (url) => {
//     socket = new WebSocket(url);

//     socket.onopen = () => console.log("WebSocket connected");
//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       listeners.forEach((listener) => listener(data));
//     };
//     socket.onerror = (error) => console.log("WebSocket Error:", error);
//     socket.onclose = () => console.log("WebSocket disconnected");
//   };


//   const subscribe = (listener) => {
//     listeners.add(listener);
//     return () => listeners.delete(listener);
//   };

//   const send = (message) => {
//     if (socket && socket.readyState === WebSocket.OPEN) {
//       socket.send(JSON.stringify(message));
//     }
    
//   };

//   const disconnect = () => {
//     if (socket) socket.close();
//   };

//   return { connect, subscribe, send, disconnect };
// })();

// export default WebSocketService;
