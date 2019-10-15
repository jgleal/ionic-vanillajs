import config from './app-config';
import './global.css';
import ViewHome from './routes/home';
import ViewMap from './routes/map';
import ViewAbout from './routes/about';

console.info(`${config.name}@${config.version}`);

//attachs cordova deviceready event to access device functions
document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
  config.isApp = true;
  //here can use device functions
}

//registers custom elements (routes & components)
window.customElements.define('view-home', ViewHome);
window.customElements.define('view-map', ViewMap);
window.customElements.define('view-about', ViewAbout);
