import './common';
import { Elm } from './src/Chat.elm';

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
const port = urlParams.get('port');

const app = Elm.Chat.init({ node: document.getElementById('main') });
app.ports.activePort.send(port);
app.ports.username.send(username);
