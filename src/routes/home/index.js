import html from './home.html'

export default class NavHome extends HTMLElement {
  connectedCallback () {
    this.innerHTML = html
  }
}
