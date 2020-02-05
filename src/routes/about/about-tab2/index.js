import html from './tab2.html'

export default class ViewTab2 extends HTMLElement {
  connectedCallback() {
    this.innerHTML = html
  }
}
