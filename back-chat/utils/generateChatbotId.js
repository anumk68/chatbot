export function generateChatbotId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomLetters =
    letters[Math.floor(Math.random() * 26)] +
    letters[Math.floor(Math.random() * 26)] +
    letters[Math.floor(Math.random() * 26)];

  const randomNumbers = Math.floor(100 + Math.random() * 900); 

  return `CHAT_${randomLetters}${randomNumbers}`;
}
