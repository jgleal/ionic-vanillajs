import config from './app-config'
import './global.css'
import ViewHome from './routes/home'
import ViewMap from './routes/map'
import ViewAbout from './routes/about'

console.log(config.version)

window.customElements.define('view-home', ViewHome)
window.customElements.define('view-map', ViewMap)
window.customElements.define('view-about', ViewAbout)
