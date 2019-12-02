import html from './mapea-card.html'

export default class MapeaCard extends HTMLElement {
  constructor() {
    super()
    this.sizeObserver = new ResizeObserver(() => {
      if (this.olMap) {
        this.olMap.updateSize()
      }
    })
    //TODO: throw error if not mapid
    this._mapid = this.getAttribute('mapid')
    this._center = JSON.parse(this.getAttribute('center'))
    this._zoom = this.getAttribute('zoom')
    this._title = this.getAttribute('title')
    this._category = this.getAttribute('category')
    this._description = this.getAttribute('description')
  }
  connectedCallback() {
    this.innerHTML = html
    this._divMap = this.querySelector('.map-card')
    this._divMap.id = this._mapid
    this._setInfo(this._title, this._category, this._description)
    this._createMap(this._divMap, this._center, this._zoom)
  }

  _createMap(div, center, zoom) {
    let mMap = M.map({
      container: div,
      center: center,
      zoom: zoom,
    })
    this.olMap = mMap.getMapImpl()
    this.sizeObserver.observe(div)
  }

  //TODO: add interpolation (i.e. Handlebars)
  _setInfo(title, subtitle, description) {
    this.querySelector('ion-card-title').innerHTML = title
    this.querySelector('ion-card-subtitle').innerHTML = subtitle
    this.querySelector('ion-card-content').innerHTML = description
  }
}
