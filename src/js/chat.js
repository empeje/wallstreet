import './common';
import incomingMessageTemplate from './templates/incomingMsg.hbs';
import incomingUserAvatar from '../images/avatar1.png';

const urlParams = new URLSearchParams(window.location.search);

const username = urlParams.get('username');
const port = urlParams.get('port');

const usernameElement = document.getElementById('username');
const portElement = document.getElementById('port');
const connectionElement = document.getElementById('connection-status');
const chatboxElement = document.getElementById('chatbox');

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
    const { user, content } = JSON.parse(event.data);
    chatboxElement.insertAdjacentHTML(
      'beforeend',
      incomingMessageTemplate({
        avatar: incomingUserAvatar,
        username: user,
        dateString: new Date().toLocaleString(),
        message: content,
      }),
    );

    chatboxElement.scrollTop = chatboxElement.scrollHeight;
  };
};

connect();
