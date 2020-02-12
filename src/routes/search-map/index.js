import html from './search-map.html'
const SEARCH_API =
  'http://mapea4-sigc.juntadeandalucia.es/mapea/api/proxy?url=http://geobusquedas-sigc.juntadeandalucia.es/geobusquedas/sedes/search?q='
const idMap = 'smap'

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
    this._divMap = this.querySelector('#' + idMap)
    this._items = this.querySelector('ion-list')
    this._searchbar = this.querySelector('ion-searchbar')
    this._searchbar.addEventListener('ionChange', event => {
      const search = event.detail.value
      if (search != '') {
        this._getData(search)
        this._showList(true)
      } else {
        this._showList(false)
      }
    })

    this.mMap = new M.map({
      container: idMap,
      controls: ['scale'],
    })
    this.olMap = this.mMap.getMapImpl()
    this.sizeObserver.observe(this)
  }

  _getData(search) {
    this._items.innerHTML = ''
    fetch(SEARCH_API + search)
      .then(data => data.json())
      .then(res => {
        this._jsonRes = JSON.parse(res.content).response
        this._jsonRes.docs.forEach(element => {
          const ionItemElem = document.createElement('ion-item') //create the item element
          ionItemElem.button = true //visually as a button
          // create child elements
          ionItemElem.innerHTML = `
            <ion-label>${
              element.nombre ? element.nombre : element.tipo
            }</ion-label>
            <ion-note slot="end">${element.municipio} (${
            element.provincia
          })</ion-note>
          `
          //manage click
          ionItemElem.addEventListener('click', () =>
            this._showElement(element)
          )
          this._items.append(ionItemElem) //append to item list
        })
      })
  }

  _showElement(element) {
    this._showList(false)
    const parser = new jsts.io.WKTReader()
    const pointCoords = parser.read(element.geom).getCoordinate()
    this.mMap
      .setCenter({
        x: pointCoords.x,
        y: pointCoords.y,
        draw: true,
      })
      .setZoom(11)
  }

  _showList(show) {
    if (show) {
      this._items.style.display = 'block'
      this._divMap.style.display = 'none'
    } else {
      this._items.style.display = 'none'
      this._divMap.style.display = 'block'
    }
  }
}
