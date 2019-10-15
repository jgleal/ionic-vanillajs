import html from './map.html'

export default class ViewMap extends HTMLElement {
  connectedCallback() {
    this.innerHTML = html
    let mMap = new M.map({
      container: this.querySelector('#map'),
      controls: ['scale'],
    })
  }
}
