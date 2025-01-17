import { App } from 'vue'
import VxeSwitchComponent from './src/switch'
import { dynamicApp } from '../dynamics'

export const VxeSwitch = Object.assign(VxeSwitchComponent, {
  install: function (app: App) {
    app.component(VxeSwitchComponent.name as string, VxeSwitchComponent)
  }
})

dynamicApp.component(VxeSwitchComponent.name as string, VxeSwitchComponent)

export const Switch = VxeSwitch
export default VxeSwitch
