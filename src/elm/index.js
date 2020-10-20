import './common';
import { Elm } from './src/Main.elm';

localStorage.removeItem('loggedIn');

Elm.Main.init({ node: document.getElementById('main') });
