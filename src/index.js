import config from './app-config'
import './global.css'
import MapeaCard from './components/mapea-card'
import ViewHome from './routes/home'
import ViewAbout from './routes/about'
import ViewMap from './routes/map'
import ThematicMap from './routes/thematic-map'
import SearchMap from './routes/search-map'

console.info(`${config.name}@${config.version}`)

//attachs cordova deviceready event to access device functions
document.addEventListener('deviceready', onDeviceReady, false)
function onDeviceReady() {
  config.isApp = true
  //here can use device functions
}

//registers custom elements (routes & components)
window.customElements.define('mapea-card', MapeaCard)
window.customElements.define('view-home', ViewHome)
window.customElements.define('view-about', ViewAbout)
window.customElements.define('view-map', ViewMap)
window.customElements.define('thematic-map', ThematicMap)
window.customElements.define('search-map', SearchMap)
