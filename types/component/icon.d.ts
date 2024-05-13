import { RenderFunction, SetupContext, Ref } from 'vue'
import { defineVxeComponent, VxeComponentBase, VxeComponentEvent } from '../tool'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

declare const VxeIcon: defineVxeComponent<VxeIconProps, VxeIconEventProps>

export interface VxeIconConstructor extends VxeComponentBase, VxeIconMethods {
  props: VxeIconProps
  context: SetupContext<VxeIconEmits>
  reactData: IconReactData
  getRefMaps(): IconPrivateRef
  getComputeMaps(): IconPrivateComputed
  renderVN: RenderFunction
}

export interface IconPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeIconPrivateRef extends IconPrivateRef { }

export namespace VxeIconPropTypes {
  export type Name = string
  export type Roll = boolean
  export type Status = string
}

export type VxeIconProps = {
  name?: VxeIconPropTypes.Name
  roll?: VxeIconPropTypes.Roll
  status?: VxeIconPropTypes.Status
}

export interface IconPrivateComputed {
}
export interface VxeIconPrivateComputed extends IconPrivateComputed { }

export interface IconReactData {
}

export interface IconMethods {
}
export interface VxeIconMethods extends IconMethods { }

export interface IconPrivateMethods { }
export interface VxeIconPrivateMethods extends IconPrivateMethods { }

export type VxeIconEmits = [
  'click'
]

export namespace VxeIconDefines {
  export interface IconEventParams extends VxeComponentEvent {
    $icon: VxeIconConstructor
  }
}

export type VxeIconEventProps = {}

export interface VxeIconListeners { }

export namespace VxeIconEvents { }

export interface VxeIconSlots {
}

export default VxeIcon