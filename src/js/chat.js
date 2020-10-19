import './common';
import incomingMessageTemplate from './templates/incomingMsg.hbs';
import outgoingMessageTemplate from './templates/outgoingMsg.hbs';
import incomingUserAvatar from '../images/avatar1.png';
import outgoingUserAvatar from '../images/avatar2.png';
import chatUserTemplate from './templates/chatUser.hbs';
import User from './models/user';

const urlParams = new URLSearchParams(window.location.search);

const username = urlParams.get('username');
const port = urlParams.get('port');

const usernameElement = document.getElementById('username');
const portElement = document.getElementById('port');
const connectionElement = document.getElementById('connection-status');
const chatboxElement = document.getElementById('chatbox');
const usersListElement = document.getElementById('users-list');
const newMessageElement = document.getElementById('new-message');

usernameElement.innerText = username;
portElement.innerText = port;

const connect = () => {
  const webSocket = new WebSocket(`ws://localhost:${port}`);

  newMessageElement.onkeypress = (e) => {
    const key = e.keyCode;
    const ENTER_KEY_NUMBER = 13;
    const content = newMessageElement.value;

    if (key === ENTER_KEY_NUMBER) {
      chatboxElement.insertAdjacentHTML(
        'beforeend',
        outgoingMessageTemplate({
          avatar: outgoingUserAvatar,
          username,
          dateString: new Date().toLocaleString(),
          message: content,
        }),
      );
      chatboxElement.scrollTop = chatboxElement.scrollHeight;

      const message = JSON.stringify({ content, username });

      webSocket.send(message);
      newMessageElement.value = '';
      return false;
    }
    return true;
  };

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
    const { username: newUsername, content } = JSON.parse(event.data);
    if (!User.exists(newUsername)) {
      const user = new User(newUsername);
      user.save();
      usersListElement.insertAdjacentHTML(
        'beforeend',
        chatUserTemplate({ avatar: incomingUserAvatar, newUsername }),
      );
    }

    chatboxElement.insertAdjacentHTML(
      'beforeend',
      incomingMessageTemplate({
        avatar: incomingUserAvatar,
        username: newUsername,
        dateString: new Date().toLocaleString(),
        message: content,
      }),
    );

    chatboxElement.scrollTop = chatboxElement.scrollHeight;
  };
};

connect();
