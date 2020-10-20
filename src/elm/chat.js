import './common';
import beep from '../lib/beep';
import { Elm } from './src/Chat.elm';

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
const port = urlParams.get('port');

const app = Elm.Chat.init({ node: document.getElementById('main') });
app.ports.activePort.send(port);
app.ports.username.send(username);

const connect = () => {
  const webSocket = new WebSocket(`ws://localhost:${port}`);

  webSocket.onopen = () => {
    app.ports.connectionStatus.send('Connected');
    localStorage.setItem('loggedIn', 'true');
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
    app.ports.connectionStatus.send('Disconnected');
    setTimeout(() => {
      connect();
    }, 1000);
  };

  webSocket.onmessage = (event) => {
    beep();
    const { content, username: newUsername } = JSON.parse(event.data);

    app.ports.messageReceiver.send({
      content,
      username: newUsername,
    });
  };
};

connect();
