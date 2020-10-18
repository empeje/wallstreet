import './common';

const urlParams = new URLSearchParams(window.location.search);

const username = urlParams.get('username');
const port = urlParams.get('port');

const usernameElement = document.getElementById('username');
const portElement = document.getElementById('port');
const connectionElement = document.getElementById('connection-status');
const chatboxElement = document.getElementById('chatbox');

usernameElement.innerText = username;
portElement.innerText = port;

const webSocket = new WebSocket(`ws://localhost:${port}`);

webSocket.onopen = () => {
  connectionElement.innerText = 'Connected';
};

webSocket.onerror = () => {
  const errorMessage = encodeURIComponent(
    `Error when connecting to the websocket on port ${port}`,
  );
  window.location.href = `index.html?flash=${errorMessage}`;
};

webSocket.onclose = () => {
  connectionElement.innerText = 'Disconnected';
};

webSocket.onmessage = (event) => {
  const newMessage = document.createElement('p');
  const { user, content } = JSON.parse(event.data);
  newMessage.innerText = `${user} said ${content}`;
  chatboxElement.appendChild(newMessage);
};
