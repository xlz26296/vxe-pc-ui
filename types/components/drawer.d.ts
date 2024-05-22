import { RenderFunction, SetupContext, Ref, ComponentPublicInstance, DefineComponent } from 'vue'
import { defineVxeComponent, VxeComponentBaseOptions, VxeComponentEventParams, ValueOf } from '@vxe-ui/core'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeDrawer: defineVxeComponent<VxeDrawerProps, VxeDrawerEventProps>
export type VxeDrawerComponent = DefineComponent<VxeDrawerProps, VxeDrawerEmits>

export type VxeDrawerInstance = ComponentPublicInstance<VxeDrawerProps, VxeDrawerConstructor>

export interface VxeDrawerConstructor extends VxeComponentBaseOptions, VxeDrawerMethods {
  props: VxeDrawerProps
  context: SetupContext<VxeDrawerEmits>
  reactData: DrawerReactData
  getRefMaps(): DrawerPrivateRef
  getComputeMaps(): DrawerPrivateComputed
  renderVN: RenderFunction
}

export interface DrawerPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeDrawerPrivateRef extends DrawerPrivateRef { }

/**
 * 窗口类型
 */
export type DrawerPosition = 'top' | 'bottom' | 'left' | 'right'

/**
 * 窗口事件类型
 */
export type DrawerEventTypes = 'model' | 'mask' | 'close' | 'confirm' | 'cancel' | 'exit' | 'exist'

export namespace VxeDrawerPropTypes {
  export type Size = VxeComponentSizeType
  export type ModelValue = boolean
  export type ID = string | null
  export type Loading = boolean
  export type ClassName = string
  export type Position = DrawerPosition
  export type Title = string | number
  export type Content = number | string | null
  export type ShowCancelButton = boolean | null
  export type CancelButtonText = string
  export type ShowConfirmButton = boolean | null
  export type ConfirmButtonText = string
  export type LockView = boolean
  export type LockScroll = boolean
  export type Mask = boolean
  export type MaskClosable = boolean
  export type EscClosable = boolean
  export type ShowHeader = boolean
  export type ShowFooter = boolean
  export type ShowClose = boolean
  export type Width = number | string
  export type Height = number | string
  export type ZIndex = number
  export type DestroyOnClose = boolean
  export type ShowTitleOverflow = boolean
  export type Transfer = boolean
  export type BeforeHideMethod = (params: DrawerVisibleParams) => Promise<any>
  export type Slots = VxeDrawerSlots
}

export type VxeDrawerProps = {
  size?: VxeDrawerPropTypes.Size
  modelValue?: VxeDrawerPropTypes.ModelValue
  id?: VxeDrawerPropTypes.ID
  loading?: VxeDrawerPropTypes.Loading
  className?: VxeDrawerPropTypes.ClassName
  position?: VxeDrawerPropTypes.Position
  title?: VxeDrawerPropTypes.Title
  content?: VxeDrawerPropTypes.Content
  showCancelButton?: VxeDrawerPropTypes.ShowCancelButton
  cancelButtonText?: VxeDrawerPropTypes.CancelButtonText
  showConfirmButton?: VxeDrawerPropTypes.ShowConfirmButton
  confirmButtonText?: VxeDrawerPropTypes.ConfirmButtonText
  lockView?: VxeDrawerPropTypes.LockView
  lockScroll?: VxeDrawerPropTypes.LockScroll
  mask?: VxeDrawerPropTypes.Mask
  maskClosable?: VxeDrawerPropTypes.MaskClosable
  escClosable?: VxeDrawerPropTypes.EscClosable
  showHeader?: VxeDrawerPropTypes.ShowHeader
  showFooter?: VxeDrawerPropTypes.ShowFooter
  showClose?: VxeDrawerPropTypes.ShowClose
  width?: VxeDrawerPropTypes.Width
  height?: VxeDrawerPropTypes.Height
  zIndex?: VxeDrawerPropTypes.ZIndex
  destroyOnClose?: VxeDrawerPropTypes.DestroyOnClose
  showTitleOverflow?: VxeDrawerPropTypes.ShowTitleOverflow
  transfer?: VxeDrawerPropTypes.Transfer
  beforeHideMethod?: VxeDrawerPropTypes.BeforeHideMethod
  slots?: VxeDrawerPropTypes.Slots
}

export interface DrawerPrivateComputed {
}
export interface VxeDrawerPrivateComputed extends DrawerPrivateComputed { }

export interface DrawerReactData {
  inited: boolean
  visible: boolean
  contentVisible: boolean
  drawerZIndex: number
  firstOpen: boolean
}

export interface DrawerMethods {
  dispatchEvent(type: ValueOf<VxeDrawerEmits>, params: Record<string, any>, evnt: Event | null): void
  /**
   * 手动打开窗口
   */
  open(): Promise<any>
  /**
   * 手动关闭窗口
   */
  close(): Promise<any>
  /**
   * 获取当前窗口元素
   */
  getBox(): HTMLElement
}
export interface VxeDrawerMethods extends DrawerMethods { }

export interface DrawerPrivateMethods { }
export interface VxeDrawerPrivateMethods extends DrawerPrivateMethods { }

export type VxeDrawerEmits = [
  'update:modelValue',
  'show',
  'hide',
  'before-hide',
  'close',
  'confirm',
  'cancel'
]

export namespace VxeDrawerDefines {
  export interface DrawerEventParams extends VxeComponentEventParams {
    $drawer: VxeDrawerConstructor
  }

  export interface DrawerOptions extends VxeDrawerProps, VxeDrawerEventProps {
    key?: string | number
  }
}

interface DrawerVisibleParams {
}

export type VxeDrawerEventProps = {
  onShow?: VxeDrawerEvents.Show
  onHide?: VxeDrawerEvents.Hide
  onBeforeHide?: VxeDrawerEvents.BeforeHide
  onConfirm?: VxeDrawerEvents.Confirm
  onCancel?: VxeDrawerEvents.Cancel
  onClose?: VxeDrawerEvents.Close
}

export interface VxeDrawerListeners {
  show?: VxeDrawerEvents.Show
  hide?: VxeDrawerEvents.Hide
  beforeHide?: VxeDrawerEvents.BeforeHide
  confirm?: VxeDrawerEvents.Confirm
  cancel?: VxeDrawerEvents.Cancel
  close?: VxeDrawerEvents.Close
}

export namespace VxeDrawerEvents {
  export type Show = (params: VxeDrawerDefines.ShowEventParams) => void
  export type Hide = (params: VxeDrawerDefines.HideEventParams) => void
  export type BeforeHide = (params: VxeDrawerDefines.BeforeHideEventParams) => void
  export type Confirm = (params: VxeDrawerDefines.ConfirmEventParams) => void
  export type Cancel = (params: VxeDrawerDefines.CancelEventParams) => void
  export type Close = (params: VxeDrawerDefines.CloseEventParams) => void
}

export namespace VxeDrawerSlotTypes {
  interface DrawerEventParams extends VxeComponentEventParams {
    $drawer: VxeDrawerConstructor & VxeDrawerMethods
  }

  interface DrawerBaseParams extends DrawerVisibleParams { }

  export interface ShowParams extends DrawerBaseParams { }
  export interface ShowEventParams extends DrawerEventParams, ShowParams { }

  export interface HideParams extends DrawerBaseParams { }
  export interface HideEventParams extends DrawerEventParams, HideParams { }

  export interface BeforeHideParams extends DrawerBaseParams { }
  export interface BeforeHideEventParams extends DrawerEventParams, BeforeHideParams { }

  export interface ConfirmParams extends DrawerBaseParams { }
  export interface ConfirmEventParams extends DrawerEventParams, ConfirmParams { }

  export interface CancelParams extends DrawerBaseParams { }
  export interface CancelEventParams extends DrawerEventParams, CancelParams { }

  export interface CloseParams extends DrawerBaseParams { }
  export interface CloseEventParams extends DrawerEventParams, CloseParams { }

  export interface ZoomParams extends DrawerBaseParams { }
  export interface ZoomEventParams extends DrawerEventParams, ZoomParams { }

  export interface ResizeParams extends DrawerBaseParams { }
  export interface ResizeEventParams extends DrawerEventParams, ResizeParams { }

  export interface MoveParams extends DrawerBaseParams { }
  export interface MoveEventParams extends DrawerEventParams, MoveParams { }

  export interface DefaultSlotParams {
    $drawer: VxeDrawerConstructor & VxeDrawerMethods
  }
  export interface HeaderSlotParams extends DefaultSlotParams { }
  export interface TitleSlotParams extends DefaultSlotParams { }
  export interface FooterSlotParams extends DefaultSlotParams { }
}

export interface VxeDrawerSlots {
  /**
   * 自定义窗口内容模板
   */
  default?(params: VxeDrawerSlotTypes.DefaultSlotParams): VxeComponentSlotType[] | VxeComponentSlotType
  /**
   * 自定义窗口头部的模板
   */
  header?(params: VxeDrawerSlotTypes.HeaderSlotParams): VxeComponentSlotType[] | VxeComponentSlotType
  /**
   * 自定义窗口标题的模板（如果使用了 header 插槽，则该插槽无效）
   */
  title?(params: VxeDrawerSlotTypes.TitleSlotParams): VxeComponentSlotType[] | VxeComponentSlotType
  /**
   * 自定义窗口右上角的模板
   */
  corner?(params: VxeDrawerSlotTypes.TitleSlotParams): VxeComponentSlotType[] | VxeComponentSlotType
  /**
   * 自定义窗口底部的模板
   */
  footer?(params: VxeDrawerSlotTypes.FooterSlotParams): VxeComponentSlotType[] | VxeComponentSlotType
}

export const Drawer: typeof VxeDrawer
export default VxeDrawer
