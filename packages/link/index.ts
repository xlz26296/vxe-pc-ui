import { App } from 'vue'
import VxeLinkComponent from './src/link'
import { dynamicApp } from '../dynamics'

export const VxeLink = Object.assign({}, VxeLinkComponent, {
  install (app: App) {
    app.component(VxeLinkComponent.name as string, VxeLinkComponent)
  }
})

dynamicApp.component(VxeLinkComponent.name as string, VxeLinkComponent)

export const Link = VxeLink
export default VxeLink
