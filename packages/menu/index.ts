import { App } from 'vue'
import VxeMenuComponent from './src/menu'
import { dynamicApp } from '../dynamics'

export const VxeMenu = Object.assign({}, VxeMenuComponent, {
  install (app: App) {
    app.component(VxeMenuComponent.name as string, VxeMenuComponent)
  }
})

dynamicApp.component(VxeMenuComponent.name as string, VxeMenuComponent)

export const Menu = VxeMenu
export default VxeMenu
