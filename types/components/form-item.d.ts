import { RenderFunction, SetupContext, Ref } from 'vue'
import { defineVxeComponent, VxeComponentBase, VxeComponentEvent, VxeComponentSlot, VxeComponentStyle } from '../tool'

/* eslint-disable no-use-before-define,@typescript-eslint/ban-types */

export declare const VxeFormItem: defineVxeComponent<VxeFormItemProps, VxeFormItemEventProps>

export interface VxeFormItemConstructor extends VxeComponentBase, VxeFormItemMethods {
  props: VxeFormItemProps
  context: SetupContext<VxeFormItemEmits>
  reactData: FormItemReactData
  getRefMaps(): FormItemPrivateRef
  getComputeMaps(): FormItemPrivateComputed
  renderVN: RenderFunction
}

export interface FormItemPrivateRef {
  refElem: Ref<HTMLDivElement | undefined>
}
export interface VxeFormItemPrivateRef extends FormItemPrivateRef { }

export namespace VxeFormItemPropTypes {
  export type Title = string
  export type Field = string
  export type Span = VxeFormPropTypes.Span
  export type Align = VxeFormPropTypes.Align
  export type TitleAlign = VxeFormPropTypes.TitleAlign
  export type TitleWidth = VxeFormPropTypes.TitleWidth
  export type TitleColon = VxeFormPropTypes.TitleColon
  export type TitleAsterisk = VxeFormPropTypes.TitleAsterisk
  export type ShowTitle = boolean
  export type Vertical = boolean

  interface ClassNameParams {
    $form: VxeFormConstructor
    data: any
    item: VxeFormDefines.ItemInfo
    field: string
    /**
     * @deprecated
     */
    property: string
  }
  export type ClassName = string | ((params: ClassNameParams) => string)

  interface ContentClassNameParams extends ClassNameParams{}
  export type ContentClassName = string | ((params: ContentClassNameParams) => string)

  interface ContentStyleParams extends ClassNameParams{}
  export type ContentStyle = VxeComponentStyle | ((params: ContentStyleParams) => VxeComponentStyle)

  interface TitleClassNameParams extends ClassNameParams{}
  export type TitleClassName = string | ((params: TitleClassNameParams) => string)

  interface TitleStyleParams extends ClassNameParams{}
  export type TitleStyle = VxeComponentStyle | ((params: TitleStyleParams) => VxeComponentStyle)

  export type Readonly = boolean

  interface PrefixOption {
    useHTML?: VxeTooltipPropTypes.UseHTML
    content?: VxeTooltipPropTypes.Content
    enterable?: VxeTooltipPropTypes.Enterable
    theme?: VxeTooltipPropTypes.Theme
    icon?: string
    /**
     * @deprecated 已废弃，请使用 content
     */
    message?: string
  }
  export type TitlePrefix = PrefixOption
  export type TitleSuffix = PrefixOption
  export type TitleOverflow = VxeFormPropTypes.TitleOverflow

  export type ResetValue = any
  export type Visible = boolean
  export type VisibleMethod = (params: FormItemVisibleParams) => boolean
  export type Folding = boolean
  export type CollapseNode = boolean
  export type ItemRender = FormItemRenderOptions
  export type Slots = {
    title?: string | ((params: FormItemTitleRenderParams) => SlotVNodeType | SlotVNodeType[]) | null
    default?: string | ((params: FormItemContentRenderParams) => SlotVNodeType | SlotVNodeType[]) | null
  }
}

export type VxeFormItemProps = {
  /**
   * 标题
   */
  title?: VxeFormItemPropTypes.Title
  /**
   * 字段名
   */
  field?: VxeFormItemPropTypes.Field
  /**
   * 栅格占据的列数（共 24 分栏）
   */
  span?: VxeFormItemPropTypes.Span
  /**
   * 内容对齐方式
   */
  align?: VxeFormItemPropTypes.Align
  /**
   * 标题对齐方式
   */
  titleAlign?: VxeFormItemPropTypes.TitleAlign
  /**
   * 标题宽度
   */
  titleWidth?: VxeFormItemPropTypes.TitleWidth
  /**
   * 是否显示标题冒号
   */
  titleColon?: VxeFormItemPropTypes.TitleColon
  /**
   * 是否显示必填字段的红色星号
   */
  titleAsterisk?: VxeFormItemPropTypes.TitleAsterisk
  /**
   * 是否显示标题
   */
  showTitle?: VxeFormItemPropTypes.ShowTitle
  /**
   * 使用垂直布局
   */
  vertical?: VxeFormItemPropTypes.Vertical
  /**
   * 给表单项附加 className
   */
  className?: VxeFormItemPropTypes.ClassName
  /**
   * 给表单项内容附加 className
   */
  contentClassName?: VxeFormItemPropTypes.ContentClassName
  /**
   * 给表单项内容附加样式
   */
  contentStyle?: VxeFormItemPropTypes.ContentStyle
  /**
   * 给表单项标题附加 className
   */
  titleClassName?: VxeFormItemPropTypes.TitleClassName
  /**
   * 给表单项标题附加样式
   */
  titleStyle?: VxeFormItemPropTypes.TitleStyle
  /**
   * 前缀配置项
   */
  titlePrefix?: VxeFormItemPropTypes.TitlePrefix
  /**
   * 后缀配置项
   */
  titleSuffix?: VxeFormItemPropTypes.TitleSuffix
  titleOverflow?: VxeFormItemPropTypes.TitleOverflow
  /**
   * 重置时的默认值
   */
  resetValue?: VxeFormItemPropTypes.ResetValue
  /**
   * 是否显示
   */
  visible?: VxeFormItemPropTypes.Visible
  /**
   * 该方法的返回值用来决定该项是否显示
   */
  visibleMethod?: VxeFormItemPropTypes.VisibleMethod
  /**
   * 默认收起
   */
  folding?: VxeFormItemPropTypes.Folding
  /**
   * 折叠节点
   */
  collapseNode?: VxeFormItemPropTypes.CollapseNode
  /**
   * 项渲染配置项
   */
  itemRender?: FormItemRenderOptions
  slots?: VxeFormItemPropTypes.Slots
  children?: VxeFormItemProps[]
}

export interface FormItemPrivateComputed {
}
export interface VxeFormItemPrivateComputed extends FormItemPrivateComputed { }

export interface FormItemReactData {
}

export interface FormItemMethods {
}
export interface VxeFormItemMethods extends FormItemMethods { }

export interface FormItemPrivateMethods { }
export interface VxeFormItemPrivateMethods extends FormItemPrivateMethods { }

export type VxeFormItemEmits = []

export namespace VxeFormItemDefines {
  export interface FormItemEventParams extends VxeComponentEvent {
    $formItem: VxeFormItemConstructor
  }
}

export type VxeFormItemEventProps = {}

export interface VxeFormItemListeners { }

export namespace VxeFormItemEvents { }

export namespace VxeFormItemSlotTypes {
  export interface DefaultSlotParams {
    [key: string]: any
  }
}

export interface VxeFormItemSlots {
  /**
   * 自定义内容模板
   */
  default: (params: VxeFormItemSlotTypes.DefaultSlotParams) => any
  /**
   * 自定义标题模板
   */
  title: (params: VxeFormItemSlotTypes.DefaultSlotParams) => any
}

export const FormItem: typeof VxeFormItem
export default VxeFormItem