import html from './info.html'

export default class NavInfo extends HTMLElement {
  connectedCallback () {
    this.innerHTML = html
    const controller = document.querySelector('ion-alert-controller')
    const button = document.querySelector('#btnAlert')
    button.controller = controller
    button.addEventListener('click', this.handleButtonClick, false)
  }
  handleButtonClick (evt) {
    evt.target.controller.create({
      header: 'Prompt!',
      inputs: [
        {
          placeholder: 'Placeholder 1'
        },
        {
          name: 'name2',
          id: 'name2-id',
          value: 'hello',
          placeholder: 'Placeholder 2'
        },
        {
          name: 'name3',
          value: 'http://ionicframework.com',
          type: 'url',
          placeholder: 'Favorite site ever'
        },
        {
          name: 'name5',
          type: 'date'
        },
        {
          name: 'name6',
          type: 'number',
          min: -5,
          max: 10,
          placeholder: '0'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel')
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok')
          }
        }
      ]
    }).then(alert => {
      alert.present()
    })
  }
}
