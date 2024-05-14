import { App } from 'vue'
import VxeFormDesignComponent from './src/form-design'

const VxeFormDesign = Object.assign({}, VxeFormDesignComponent, {
  install (app: App) {
    app.component(VxeFormDesignComponent.name as string, VxeFormDesignComponent)
  }
})

export const FormDesign = VxeFormDesign
export default VxeFormDesign