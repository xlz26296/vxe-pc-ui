import { App } from 'vue'
import VxeTabsComponent from './src/tabs'
import { dynamicApp } from '../dynamics'

export const VxeTabs = Object.assign({}, VxeTabsComponent, {
  install (app: App) {
    app.component(VxeTabsComponent.name as string, VxeTabsComponent)
  }
})

dynamicApp.component(VxeTabsComponent.name as string, VxeTabsComponent)

export const Tabs = VxeTabs
export default VxeTabs
