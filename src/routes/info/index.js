import html from './info.html'

export default class NavInfo extends HTMLElement {
  connectedCallback () {
    this.innerHTML = html
  }
}
