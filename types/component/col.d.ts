import { RenderFunction, SetupContext, Ref } from 'vue'
import { defineVxeComponent, VxeComponentBase, VxeComponentEvent } from '../tool'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

declare const VxeCol: defineVxeComponent<VxeColProps, VxeColEventProps>

export interface VxeColConstructor extends VxeComponentBase, VxeColMethods {
  props: VxeColProps
  context: SetupContext<VxeColEmits>
  reactData: ColReactData
  getRefMaps(): ColPrivateRef
  getComputeMaps(): ColPrivateComputed
  renderVN: RenderFunction
}

export interface ColPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeColPrivateRef extends ColPrivateRef { }

export namespace VxeColPropTypes {
}

export type VxeColProps = {}

export interface ColPrivateComputed {
}
export interface VxeColPrivateComputed extends ColPrivateComputed { }

export interface ColReactData {
}

export interface ColMethods {
}
export interface VxeColMethods extends ColMethods { }

export interface ColPrivateMethods { }
export interface VxeColPrivateMethods extends ColPrivateMethods { }

export type VxeColEmits = []

export namespace VxeColDefines {
  export interface ColEventParams extends VxeComponentEvent {
    $col: VxeColConstructor
  }
}

export type VxeColEventProps = {}

export interface VxeColListeners { }

export namespace VxeColEvents { }

export interface VxeColSlots {
}

export default VxeCol