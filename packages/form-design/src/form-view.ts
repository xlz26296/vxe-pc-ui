import { defineComponent, ref, h, reactive, nextTick, PropType, inject, provide, watch, createCommentVNode } from 'vue'
import XEUtils from 'xe-utils'
import { renderer, createEvent } from '@vxe-ui/core'
import { getSlotVNs } from '../../ui/src/vn'
import { createDefaultFormViewPCFormConfig } from './default-setting-data'
import VxeFormComponent from '../../form/src/form'
import VxeFormGatherComponent from '../../form/src/form-gather'
import VxeFormItemComponent from '../../form/src/form-item'
import { configToWidget } from './widget-info'

import type { VxeGlobalRendererHandles, VxeFormViewPropTypes, FormViewReactData, ValueOf, FormViewPrivateRef, FormViewMethods, FormViewPrivateMethods, VxeFormViewEmits, VxeFormViewPrivateComputed, VxeFormProps, VxeFormDesignDefines, VxeFormViewConstructor, VxeFormViewPrivateMethods, VxeFormPropTypes, VxeFormInstance, VxeFormViewDefines, VxeFormDesignLayoutStyle, VxeFormEvents } from '../../../types'

export default defineComponent({
  name: 'VxeFormView',
  props: {
    modelValue: Object as PropType<VxeFormViewPropTypes.ModelValue>,
    config: {
      type: Object as PropType<VxeFormViewPropTypes.Config>,
      default: () => ({})
    },
    viewRender: Object as PropType<VxeFormViewPropTypes.ViewRender>,
    createFormConfig: Function as PropType<VxeFormViewPropTypes.CreateFormConfig>
  },
  emits: [
    'update:modelValue',
    'submit',
    'reset'
  ] as VxeFormViewEmits,
  setup (props, context) {
    const { emit, slots } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()
    const formRef = ref<VxeFormInstance>()

    const $xeFormDesignLayoutStyle = inject<VxeFormDesignLayoutStyle | null>('$xeFormDesignLayoutStyle', null)

    const reactData = reactive<FormViewReactData>({
      formConfig: {},
      formRules: {},
      widgetObjList: []
    })

    const refMaps: FormViewPrivateRef = {
      refElem
    }

    const computeMaps: VxeFormViewPrivateComputed = {
    }

    const $xeFormView = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeFormViewConstructor & VxeFormViewPrivateMethods

    const loadConfig = (config: VxeFormDesignDefines.FormDesignConfig | null) => {
      if (config) {
        const { formConfig, widgetData } = config
        loadFormConfig(formConfig || {})
        loadWidgetData(widgetData || [])
      }
      return nextTick()
    }

    const loadFormConfig = (formConfig: VxeFormProps) => {
      const { viewRender } = props
      const { createFormConfig } = props
      const params: VxeFormViewDefines.CreateFormConfigParams = { viewRender, formConfig }
      if (createFormConfig) {
        reactData.formConfig = createFormConfig(params)
      } else {
        const { name } = viewRender || {}
        const compConf = renderer.get(name) || {}
        const createPCFormConfig = compConf ? compConf.createFormViewFormConfig : null
        reactData.formConfig = Object.assign({}, createPCFormConfig ? createPCFormConfig(params) : createDefaultFormViewPCFormConfig(params))
      }
      return nextTick()
    }

    const loadWidgetData = (widgetData: VxeFormDesignDefines.WidgetObjItem[]) => {
      reactData.widgetObjList = (widgetData || []).map(item => configToWidget(item))
      updateWidgetInfo()
      return nextTick()
    }

    const updateWidgetInfo = () => {
      const formData: VxeFormPropTypes.Data = Object.assign({}, props.modelValue)
      const formRules: VxeFormPropTypes.Rules = {}
      XEUtils.eachTree(reactData.widgetObjList, widget => {
        const { name, field, required } = widget
        const compConf = renderer.get(name) || {}
        const createWidgetViewRules = compConf.createFormDesignWidgetRules
        formData[field] = null
        if (createWidgetViewRules) {
          const rules = createWidgetViewRules({ widget })
          if (rules && rules.length) {
            formRules[field] = rules
          }
        } else if (required) {
          formRules[field] = [
            { required: true, content: '该填写该字段！' }
          ]
        }
      }, { children: 'children' })
      reactData.formRules = formRules
      emit('update:modelValue', formData)
    }

    const updateItemStatus = (widget: VxeFormDesignDefines.WidgetObjItem, value: any) => {
      const { field } = widget
      const $form = formRef.value
      if ($form) {
        $form.updateStatus({ field }, value)
      }
      return nextTick()
    }

    const setItemValue = (widget: VxeFormDesignDefines.WidgetObjItem, value: any) => {
      const { modelValue } = props
      const { field } = widget
      const $form = formRef.value
      if (modelValue) {
        modelValue[field] = value
      }
      if ($form) {
        $form.updateStatus({ field }, value)
      }
      return nextTick()
    }

    const getItemValue = (widget: VxeFormDesignDefines.WidgetObjItem) => {
      const { modelValue } = props
      if (modelValue) {
        return modelValue[widget.field]
      }
      return null
    }

    const dispatchEvent = (type: ValueOf<VxeFormViewEmits>, params: any, evnt: Event) => {
      emit(type, createEvent(evnt, { $xeFormView }, params))
    }

    const formViewMethods: FormViewMethods = {
      dispatchEvent,
      loadConfig,
      loadFormConfig,
      loadWidgetData,
      updateItemStatus,
      setItemValue,
      getItemValue
    }

    const handleSubmit: VxeFormEvents.Submit = (params) => {
      dispatchEvent('submit', params, params.$event)
    }

    const handleReset: VxeFormEvents.Reset = (params) => {
      dispatchEvent('reset', params, params.$event)
    }

    const formViewPrivateMethods: FormViewPrivateMethods = {
    }

    Object.assign($xeFormView, formViewMethods, formViewPrivateMethods)

    const renderVN = () => {
      const { modelValue } = props
      const { formConfig, formRules, widgetObjList } = reactData
      const headerSlot = slots.header
      const footerSlot = slots.footer

      return h('div', {
        ref: refElem,
        class: 'vxe-form-view'
      }, [
        h(VxeFormComponent, {
          ref: formRef,
          data: modelValue,
          customLayout: true,
          span: 24,
          vertical: formConfig.vertical,
          titleBold: formConfig.titleBold,
          titleColon: formConfig.titleColon,
          titleAlign: formConfig.titleAlign,
          titleWidth: formConfig.titleWidth,
          rules: formRules,
          onSubmit: handleSubmit,
          onReset: handleReset
        }, {
          default () {
            return [
              headerSlot
                ? h(VxeFormItemComponent, {}, {
                  default () {
                    return headerSlot({})
                  }
                })
                : createCommentVNode(),
              ...widgetObjList.map(widget => {
                const { name } = widget
                const compConf = renderer.get(name) || {}
                const renderWidgetDesignView = compConf.renderFormDesignWidgetView
                const renderWidgetDesignPreview = compConf.renderFormDesignWidgetPreview
                const renderWidgetDesignMobilePreview = compConf.renderFormDesignWidgetMobilePreview
                const renderOpts: VxeGlobalRendererHandles.RenderFormDesignWidgetViewOptions = widget
                const params: VxeGlobalRendererHandles.RenderFormDesignWidgetViewParams = { widget, isEditMode: false, isViewMode: true }
                return h(VxeFormGatherComponent, {
                  key: widget.id
                }, {
                  default () {
                    // 如果处于表单设计器-样式设置-预览模式下
                    if ($xeFormDesignLayoutStyle) {
                      if ($xeFormDesignLayoutStyle.reactData.activeTab === 2) {
                        if (renderWidgetDesignMobilePreview) {
                          return getSlotVNs(renderWidgetDesignMobilePreview(renderOpts, params))
                        }
                      } else {
                        if (renderWidgetDesignPreview) {
                          return getSlotVNs(renderWidgetDesignPreview(renderOpts, params))
                        }
                      }
                    }
                    return renderWidgetDesignView ? getSlotVNs(renderWidgetDesignView(renderOpts, params)) : []
                  }
                })
              }),
              footerSlot
                ? h(VxeFormItemComponent, {}, {
                  default () {
                    return footerSlot({})
                  }
                })
                : createCommentVNode()
            ]
          }
        })
      ])
    }

    $xeFormView.renderVN = renderVN

    watch(() => props.config, () => {
      loadConfig(props.config)
    })

    loadConfig(props.config)

    provide('$xeFormView', $xeFormView)

    return $xeFormView
  },
  render () {
    return this.renderVN()
  }
})
