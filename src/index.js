import config from './app-config'
import './global.css'
import ViewHome from './routes/home'
import ViewInfo from './routes/info'

console.log(config.version)
console.log(ViewHome)

window.customElements.define('view-home', ViewHome)
window.customElements.define('view-info', ViewInfo)
