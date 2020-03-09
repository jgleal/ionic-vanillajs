import html from './view-tabs.html'
const PROXY_URL = 'http://mapea4-sigc.juntadeandalucia.es/mapea/api/proxy?url='
const API_URL =
  'http%3A%2F%2Fwww.juntadeandalucia.es%2Finstitutodeestadisticaycartografia%2Fgeoserver-ieca%2Fconocetusfuentes%2Fwfs%3Fversion%3D2.0.0%26request%3DGetFeature%26typeName%3Dconocetusfuentes%3Afuentesymanantiales%26count%3D15%26outputFormat%3Dapplication%252Fjson'

export default class ViewTabs extends HTMLElement {
  connectedCallback() {
    this.innerHTML = html
  }

  async getData() {
    //TODO: almacenar data para pedirlo solo 1 vez
    let res = await fetch(PROXY_URL + API_URL)
    let data = await res.json()
    return data
  }
}
