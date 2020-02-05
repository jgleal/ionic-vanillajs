import html from './tab1.html'

export default class ViewTab1 extends HTMLElement {
  connectedCallback() {
    this.innerHTML = html
  }
}
