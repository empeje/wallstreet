import './common';
import { Elm } from './src/Chat.elm';

const app = Elm.Chat.init({ node: document.getElementById('main') });
app.ports.locationSearch.send(window.location.search);
