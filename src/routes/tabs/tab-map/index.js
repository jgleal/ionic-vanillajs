import html from './tab-map.html'

export default class ViewTabMap extends HTMLElement {
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
    this._parent = document.querySelector('view-tabs')
    this._generateLayer()

    this.mMap = new M.map({
      container: 'map',
      center: [236403, 4141785],
      zoom: 3,
      controls: ['scale'],
    })

    this.olMap = this.mMap.getMapImpl()
    this.sizeObserver.observe(this)
  }

  async _generateLayer() {
    const geoData = await this._parent.getData()
    let lyGeo = new M.layer.GeoJSON({
      name: 'capaJson',
      source: geoData.content,
    })
    lyGeo.setStyle(
      new M.style.Point({
        radius: 5,
        fill: {
          color: 'green',
        },
        stroke: {
          color: '#000',
        },
      })
    )
    this.mMap.addLayers(lyGeo)
  }

  showElement(element) {
    console.log(element)
  }
}
