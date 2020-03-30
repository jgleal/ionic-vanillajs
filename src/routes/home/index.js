import html from './home.html'
import './home.css'
import config from '@/app-config'

export default class ViewHome extends HTMLElement {
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
    const controller = this.querySelector('ion-alert-controller')
    const button = this.querySelector('#btnAlert')
    button.controller = controller
    button.addEventListener('click', this.handleButtonClick, false)
    this.sizeObserver.observe(this)
  }

  handleButtonClick(evt) {
    let contentMessage = `<p class="alert-footer"><small>Template made by <a href="https://github.com/jgleal">JGLeal</a><small></p>`
    if (config.isApp) {
      contentMessage =
        `<ul class="alert-ul">
                          <li><b>Platform:</b> ${device.platform}</li>
                          <li><b>Manufacturer:</b> ${device.manufacturer}</li>
                          <li><b>Model:</b> ${device.model}</li>
                          <li><b>uuid:</b> ${device.uuid}</li>
                        </ul>` + contentMessage
    }
    let alert = document.createElement('ion-alert')
    alert.header = 'Info'
    alert.message = contentMessage
    alert.buttons = [
      {
        text: 'Ok',
        handler: () => {
          console.log('Alert Ok')
        },
      },
    ]
    document.body.appendChild(alert)
    alert.present()
  }
}
