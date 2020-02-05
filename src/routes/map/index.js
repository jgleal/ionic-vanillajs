import html from './map.html'
const ZOOM_PROV = 6

export default class ViewMap extends HTMLElement {
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
    this._selectProv = this.querySelector('#selectProv')

    this._selectProv.addEventListener('ionChange', evt => {
      this.mMap.setCenter(evt.detail.value).setZoom(ZOOM_PROV)
    })

    this.mMap = new M.map({
      container: 'map',
      controls: ['scale'],
    })
    this.olMap = this.mMap.getMapImpl()
    this.sizeObserver.observe(this)
  }
}
