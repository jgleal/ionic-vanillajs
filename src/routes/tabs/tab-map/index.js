import html from './tab-map.html'
const featureStyle = new M.style.Point({
  radius: 5,
  fill: {
    color: 'green',
  },
  stroke: {
    color: '#000',
  },
})
const featureSelStyle = new M.style.Point({
  radius: 7,
  fill: {
    color: 'yellow',
  },
  stroke: {
    color: '#000',
  },
})
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
      container: 'tmap',
      center: [236403, 4141785],
      zoom: 3,
      controls: ['scale'],
    })

    this.olMap = this.mMap.getMapImpl()
    this.sizeObserver.observe(this)
  }

  async _generateLayer() {
    const geoData = await this._parent.getData()
    console.log(geoData)
    this.lyGeo = new M.layer.GeoJSON({
      name: 'Fuentes de Andalucía',
      source: geoData,
    })
    this.lyGeo.on(M.evt.SELECT_FEATURES, (features) => {
      features.forEach((f) => {
        f.setStyle(featureSelStyle)
      })
    })
    this.lyGeo.on(M.evt.UNSELECT_FEATURES, (features) => {
      features.forEach((f) => {
        f.setStyle(featureStyle)
      })
    })

    this.lyGeo.setStyle(featureStyle)

    this.mMap.addLayers(this.lyGeo)
  }

  showElement(element) {
    const coordsFeature = element.geometry.coordinates
    this.mMap.setCenter(coordsFeature).setZoom(12)
    const f = this.lyGeo.getFeatureById(element.id)
    const featuresHandler = this.mMap.getFeatureHandler()
    const featuresSelected =
      featuresHandler.prevSelectedFeatures_[this.lyGeo.name]
    if (featuresSelected.length > 0) {
      featuresHandler.unselectFeatures(featuresSelected, this.lyGeo, {})
      this.mMap.removePopup()
    }
    featuresHandler.selectFeatures([f], this.lyGeo, {
      coord: coordsFeature,
    })
    window.location.href = '#/tabs/tab-map'
  }
}
