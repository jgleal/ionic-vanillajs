import html from './map.html'

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
    let mMap = new M.map({
      container: 'map',
      controls: ['scale'],
    })
    this.olMap = mMap.getMapImpl()
    this.sizeObserver.observe(this)
  }
}
