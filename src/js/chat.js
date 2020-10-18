import './common';

const urlParams = new URLSearchParams(window.location.search);

const username = urlParams.get('username');
const port = urlParams.get('port');

const usernameElement = document.getElementById('username') || {}; // TODO: Fix this
const portElement = document.getElementById('port') || {}; // TODO: Fix this
const connectionElement = document.getElementById('connection-status');
const chatboxElement = document.getElementById('chatbox') || {}; // TODO: Fix this

usernameElement.innerText = username;
portElement.innerText = port;

const connect = () => {
  const webSocket = new WebSocket(`ws://localhost:${port}`);

  webSocket.onopen = () => {
    localStorage.setItem('loggedIn', 'true');
    connectionElement.innerText = 'Connected';
  };

  webSocket.onerror = () => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

    if (!isLoggedIn) {
      const errorMessage = encodeURIComponent(
        `Error when connecting to the websocket on port ${port}`,
      );
      window.location.href = `index.html?flash=${errorMessage}`;
    }
  };

  webSocket.onclose = () => {
    connectionElement.innerText = 'Disconnected';
    setTimeout(() => {
      connect();
    }, 1000);
  };

  webSocket.onmessage = (event) => {
    const newMessage = document.createElement('p');
    const { user, content } = JSON.parse(event.data);
    newMessage.innerText = `${user} said ${content}`;
    chatboxElement.appendChild(newMessage);
  };
};

connect();
