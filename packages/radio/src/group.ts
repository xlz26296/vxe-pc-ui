import { defineComponent, h, provide, PropType, inject, computed } from 'vue'
import XEUtils from 'xe-utils'
import { getConfig, createEvent, useSize } from '@vxe-ui/core'
import VxeRadioComponent from './radio'
import VxeRadioButtonComponent from './button'

import type { VxeRadioGroupPropTypes, VxeRadioGroupConstructor, VxeRadioGroupEmits, VxeRadioGroupPrivateMethods, RadioGroupPrivateMethods, RadioGroupMethods, VxeFormConstructor, VxeFormPrivateMethods, VxeFormDefines } from '../../../types'

export default defineComponent({
  name: 'VxeRadioGroup',
  props: {
    modelValue: [String, Number, Boolean] as PropType<VxeRadioGroupPropTypes.ModelValue>,
    disabled: Boolean as PropType<VxeRadioGroupPropTypes.Disabled>,
    type: String as PropType<VxeRadioGroupPropTypes.Type>,
    options: Array as PropType<VxeRadioGroupPropTypes.Options>,
    optionProps: Object as PropType<VxeRadioGroupPropTypes.OptionProps>,
    strict: { type: Boolean as PropType<VxeRadioGroupPropTypes.Strict>, default: () => getConfig().radioGroup.strict },
    size: { type: String as PropType<VxeRadioGroupPropTypes.Size>, default: () => getConfig().radioGroup.size || getConfig().size }
  },
  emits: [
    'update:modelValue',
    'change'
  ] as VxeRadioGroupEmits,
  setup (props, context) {
    const { slots, emit } = context
    const $xeForm = inject<VxeFormConstructor & VxeFormPrivateMethods | null>('$xeForm', null)
    const formItemInfo = inject<VxeFormDefines.ProvideItemInfo | null>('xeFormItemInfo', null)

    const xID = XEUtils.uniqueId()

    const $xeradiogroup = {
      xID,
      props,
      context,
      name: XEUtils.uniqueId('xegroup_')
    } as unknown as VxeRadioGroupConstructor & VxeRadioGroupPrivateMethods

    const computePropsOpts = computed(() => {
      return props.optionProps || {}
    })

    const computeLabelField = computed(() => {
      const propsOpts = computePropsOpts.value
      return propsOpts.label || 'label'
    })

    const computeValueField = computed(() => {
      const propsOpts = computePropsOpts.value
      return propsOpts.value || 'value'
    })

    const computeDisabledField = computed(() => {
      const propsOpts = computePropsOpts.value
      return propsOpts.disabled || 'disabled'
    })

    let radioGroupMethods = {} as RadioGroupMethods

    useSize(props)

    const radioGroupPrivateMethods: RadioGroupPrivateMethods = {
      handleChecked (params, evnt) {
        emit('update:modelValue', params.label)
        radioGroupMethods.dispatchEvent('change', params, evnt)
        // 自动更新校验状态
        if ($xeForm && formItemInfo) {
          $xeForm.triggerItemEvent(evnt, formItemInfo.itemConfig.field, params.label)
        }
      }
    }

    radioGroupMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, createEvent(evnt, { $radioGroup: $xeradiogroup }, params))
      }
    }

    const renderVN = () => {
      const { options, type } = props
      const defaultSlot = slots.default
      const valueField = computeValueField.value as 'value'
      const labelField = computeLabelField.value as 'label'
      const disabledField = computeDisabledField.value as 'disabled'
      const btnComp = type === 'button' ? VxeRadioButtonComponent : VxeRadioComponent
      return h('div', {
        class: 'vxe-radio-group'
      }, defaultSlot
        ? defaultSlot({})
        : (options
            ? options.map(item => {
              return h(btnComp, {
                label: item[valueField],
                content: item[labelField],
                disabled: item[disabledField]
              })
            })
            : []))
    }

    Object.assign($xeradiogroup, radioGroupPrivateMethods, {
      renderVN,
      dispatchEvent
    })

    provide('$xeRadioGroup', $xeradiogroup)

    return renderVN
  }
})
