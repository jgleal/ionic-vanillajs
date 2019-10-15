import html from './about.html'

export default class ViewAbout extends HTMLElement {
  connectedCallback() {
    this.innerHTML = html
  }
}
