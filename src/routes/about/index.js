import html from './about.html'
import './about.css'

export default class ViewAbout extends HTMLElement {
  connectedCallback() {
    this.innerHTML = html
  }
}
