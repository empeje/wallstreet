import './common';
import { Elm } from './src/Main.elm';

localStorage.removeItem('loggedIn');

const urlParams = new URLSearchParams(window.location.search);
const flash = urlParams.get('flash') || '';

Elm.Main.init({
  node: document.getElementById('main'),
  flags: { flash },
});
