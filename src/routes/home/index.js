import html from './home.html'

export default class ViewHome extends HTMLElement {
  connectedCallback () {
    this.innerHTML = html
    const controller = document.querySelector('ion-alert-controller')
    const button = document.querySelector('#btnAlert')
    button.controller = controller
    button.addEventListener('click', this.handleButtonClick, false)
  }
  handleButtonClick (evt) {
    evt.target.controller.create({
      header: 'Info',
      message: 'Template made by <a href="https://github.com/jgleal">JGLeal</a>',
      buttons: [
       {
          text: 'Ok',
          handler: () => {
            console.log('Alert Ok')
          }
        }
      ]
    }).then(alert => {
      alert.present()
    })
  }  
}
