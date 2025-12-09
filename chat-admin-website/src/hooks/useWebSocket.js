// class WebSocketService {
//   static socket = null;

//   static connect(url) {
//     if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
//       this.socket = new WebSocket(url);
//       this.socket.onopen = () => console.log("[WS] Connected");
//       this.socket.onclose = () => console.log("[WS] Disconnected");
//     }
//   }

//   static subscribe(callback) {
//     if (!this.socket) return () => {};
//     const handler = (event) => {
//       const data = JSON.parse(event.data);
//       callback(data);
//     };
//     this.socket.addEventListener("message", handler);
//     return () => {
//       this.socket.removeEventListener("message", handler);
//     };
//   }

//   static disconnect() {
//     if (this.socket) this.socket.close();
//   }
// }

// export default WebSocketService;
