import config from './app-config'
import './global.css'
import 'regenerator-runtime/runtime'
import MapeaCard from './components/mapea-card'
import ViewHome from './routes/home'
import ViewAbout from './routes/about'
import ViewMap from './routes/map'
import CategoryMap from './routes/category-map'
import SearchMap from './routes/search-map'
import ViewTabs from './routes/tabs'
import ViewTabsMap from './routes/tabs/tab-map'
import ViewTabsInfo from './routes/tabs/tab-information'

console.info(`${config.name}@${config.version}`)

//attachs cordova deviceready event to access device functions
document.addEventListener('deviceready', onDeviceReady, false)
function onDeviceReady() {
  config.isApp = true
  M.proxy(false)
  //here can use device functions
}

//registers custom elements (routes & components)
window.customElements.define('mapea-card', MapeaCard)
window.customElements.define('view-home', ViewHome)
window.customElements.define('view-about', ViewAbout)
window.customElements.define('view-map', ViewMap)
window.customElements.define('category-map', CategoryMap)
window.customElements.define('search-map', SearchMap)
window.customElements.define('view-tabs', ViewTabs)
window.customElements.define('tab-map', ViewTabsMap)
window.customElements.define('tab-information', ViewTabsInfo)
