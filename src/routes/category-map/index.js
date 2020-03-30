import html from './category-map.html'
import geojson from './data.json'
import imgBus from './img/bus.svg'
import imgShop from './img/basket.svg'
import imgBar from './img/cafe.svg'

const styleShop = new M.style.Point({
  icon: {
    src: imgShop,
    scale: 0.05,
  },
})
const styleBar = new M.style.Point({
  icon: {
    src: imgBar,
    scale: 0.05,
  },
})
const styleBus = new M.style.Point({
  icon: {
    src: imgBus,
    scale: 0.05,
  },
})

const lyData = new M.layer.GeoJSON({
  name: 'data',
  source: geojson,
})
lyData.setStyle(
  new M.style.Category('type', {
    shop: styleShop,
    bar: styleBar,
    bus: styleBus,
  })
)
let filters = [
  M.filter.EQUAL('type', 'bus'),
  M.filter.EQUAL('type', 'shop'),
  M.filter.EQUAL('type', 'bar'),
]

export default class ViewCategoryMap extends HTMLElement {
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

    this.mMap = new M.map({
      container: 'tmap',
      center: [236403, 4141785],
      zoom: 6,
      controls: ['scale'],
    })

    this.mMap.addLayers(lyData)

    this.olMap = this.mMap.getMapImpl()
    this.sizeObserver.observe(this)

    this._toggleCategory(this.querySelector('#bus'), 'bus')
    this._toggleCategory(this.querySelector('#shop'), 'shop')
    this._toggleCategory(this.querySelector('#bar'), 'bar')
  }

  _toggleCategory(btn, category) {
    btn.addEventListener('click', evt => {
      const icon = btn.querySelector('ion-icon')
      if (icon.name.indexOf('-outline') != -1) {
        //active
        btn.color = 'dark'
        icon.name = icon.name.replace('-outline', '')
        filters.push(M.filter.EQUAL('type', category))
      } else {
        //deactive
        filters = filters.filter(f => f.toCQL() != `type='${category}'`)
        btn.color = 'light'
        icon.name += '-outline'
      }
      lyData.setFilter(M.filter.OR(filters))
    })
  }
}
