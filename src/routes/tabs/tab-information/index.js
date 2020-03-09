import html from './tab-info.html'

export default class ViewTabInfo extends HTMLElement {
  connectedCallback() {
    this.innerHTML = html
    this._items = this.querySelector('ion-list')
    this._parent = document.querySelector('view-tabs')

    this._getData()
  }

  async _getData() {
    let data = await this._parent.getData()
    data = JSON.parse(data.content) //debido a pasar por proxy
    this._generateList(data.content.features)
  }

  _generateList(features) {
    features.forEach(element => {
      const ionItemElem = document.createElement('ion-item') //create the item element
      ionItemElem.button = true //visually as a button
      // create child elements
      ionItemElem.innerHTML = `
            <ion-thumbnail slot="start"><img src="${element.properties.enlace_fot}"></ion-thumbnail>
            <ion-label>${element.properties.nombre}</ion-label>
            <ion-note slot="end">${element.properties.municipio} (${element.properties.provincia})</ion-note>
          `
      //manage click
      ionItemElem.addEventListener('click', () => this._showElement(element))
      this._items.append(ionItemElem) //append to item list
    })
  }

  _showElement(element) {
    const tabmap = document.querySelector('tab-map')
    tabmap.showElement(element)
  }
}
