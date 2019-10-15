import html from './home.html'
import './home.css'
import config from '@/app-config'

export default class ViewHome extends HTMLElement {
  constructor() {
    super()
    this.sizeObserver = new ResizeObserver(() => {
      if (this.olMap) {
        this.olMap.updateSize()
      }
    })
  }
  connectedCallback() {
    this.innerHTML = html
    const controller = this.querySelector('ion-alert-controller')
    const button = this.querySelector('#btnAlert')
    button.controller = controller
    button.addEventListener('click', this.handleButtonClick, false)
    this.sizeObserver.observe(this)
    this._createMap()
  }

  handleButtonClick(evt) {
    let contentMessage = `<p class="alert-footer"><small>Template made by <a href="https://github.com/jgleal">JGLeal</a><small></p>`
    if (config.isApp) {
      contentMessage =
        `<ul class="alert-ul">
                          <li><b>Platform:</b> ${device.platform}</li>
                          <li><b>Manufacturer:</b> ${device.manufacturer}</li>
                          <li><b>Model:</b> ${device.model}</li>
                          <li><b>uuid:</b> ${device.uuid}</li>
                        </ul>` + contentMessage
    }
    evt.target.controller
      .create({
        header: 'Info',
        message: contentMessage,
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              console.log('Alert Ok')
            },
          },
        ],
      })
      .then(alert => {
        alert.present()
      })
  }

  _createMap() {
    let mMap = M.map({
      container: 'map-home',
      wmcfile: [
        'http://mapea4-sigc.juntadeandalucia.es/files/wmc/satelite.xml*Satelite',
      ],
      center: [-3.587692, 37.175766],
      zoom: 13,
      projection: 'EPSG:4326*d',
    })

    let puntosInteres = new M.layer.GeoJSON({
      source: {
        features: [
          {
            properties: {
              'Dirección: ': 'Calle Real de la Alhambra, s/n, 18009 Granada',
              'Coordenadas: ': '-3.587692, 37.175766',
            },
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-3.587692, 37.175766],
            },
          },
        ],
        type: 'FeatureCollection',
      },
      name: 'Puntos de Interés',
    })
    mMap.addLayers(puntosInteres)
    console.log(mMap.getFeatureHandler())
    puntosInteres.on(M.evt.SELECT_FEATURES, features => {
      console.log(features)
    })
    this.olMap = mMap.getMapImpl()
  }
}
