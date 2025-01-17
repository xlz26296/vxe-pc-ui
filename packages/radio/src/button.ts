import { defineComponent, h, computed, inject, PropType } from 'vue'
import XEUtils from 'xe-utils'
import { getFuncText } from '../../ui/src/utils'
import { getConfig, createEvent, useSize } from '@vxe-ui/core'

import type { VxeRadioButtonPropTypes, VxeRadioGroupConstructor, VxeRadioButtonConstructor, VxeRadioButtonEmits, VxeRadioGroupPrivateMethods, RadioButtonMethods, VxeFormConstructor, VxeFormPrivateMethods, VxeFormDefines } from '../../../types'

export default defineComponent({
  name: 'VxeRadioButton',
  props: {
    modelValue: [String, Number, Boolean] as PropType<VxeRadioButtonPropTypes.ModelValue>,
    label: { type: [String, Number, Boolean] as PropType<VxeRadioButtonPropTypes.Label>, default: null },
    title: [String, Number] as PropType<VxeRadioButtonPropTypes.Title>,
    content: [String, Number] as PropType<VxeRadioButtonPropTypes.Content>,
    disabled: Boolean as PropType<VxeRadioButtonPropTypes.Disabled>,
    strict: { type: Boolean as PropType<VxeRadioButtonPropTypes.Strict>, default: () => getConfig().radioButton.strict },
    size: { type: String as PropType<VxeRadioButtonPropTypes.Size>, default: () => getConfig().radioButton.size || getConfig().size }
  },
  emits: [
    'update:modelValue',
    'change'
  ] as VxeRadioButtonEmits,
  setup (props, context) {
    const { slots, emit } = context
    const $xeForm = inject<VxeFormConstructor & VxeFormPrivateMethods | null>('$xeForm', null)
    const xeFormItemInfo = inject<VxeFormDefines.ProvideItemInfo | null>('xeFormItemInfo', null)

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const $xeradiobutton = {
      xID,
      props,
      context
    } as unknown as VxeRadioButtonConstructor

    let radioButtonMethods = {} as RadioButtonMethods

    const $xeradiogroup = inject('$xeRadioGroup', null as (VxeRadioGroupConstructor & VxeRadioGroupPrivateMethods) | null)

    const computeDisabled = computed(() => {
      return props.disabled || ($xeradiogroup && $xeradiogroup.props.disabled)
    })

    const computeName = computed(() => {
      return $xeradiogroup ? $xeradiogroup.name : null
    })

    const computeStrict = computed(() => {
      return $xeradiogroup ? $xeradiogroup.props.strict : props.strict
    })

    const computeChecked = computed(() => {
      const { modelValue, label } = props
      return $xeradiogroup ? $xeradiogroup.props.modelValue === label : modelValue === label
    })

    radioButtonMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, createEvent(evnt, { $radioButton: $xeradiobutton }, params))
      }
    }

    Object.assign($xeradiobutton, radioButtonMethods)

    const handleValue = (label: VxeRadioButtonPropTypes.Label, evnt: Event) => {
      if ($xeradiogroup) {
        $xeradiogroup.handleChecked({ label }, evnt)
      } else {
        emit('update:modelValue', label)
        radioButtonMethods.dispatchEvent('change', { label }, evnt)
        // 自动更新校验状态
        if ($xeForm && xeFormItemInfo) {
          $xeForm.triggerItemEvent(evnt, xeFormItemInfo.itemConfig.field, label)
        }
      }
    }

    const changeEvent = (evnt: Event) => {
      const isDisabled = computeDisabled.value
      if (!isDisabled) {
        handleValue(props.label, evnt)
      }
    }

    const clickEvent = (evnt: Event) => {
      const isDisabled = computeDisabled.value
      const isStrict = computeStrict.value
      if (!isDisabled && !isStrict) {
        if (props.label === ($xeradiogroup ? $xeradiogroup.props.modelValue : props.modelValue)) {
          handleValue(null, evnt)
        }
      }
    }

    const renderVN = () => {
      const vSize = computeSize.value
      const isDisabled = computeDisabled.value
      const name = computeName.value
      const checked = computeChecked.value
      return h('label', {
        class: ['vxe-radio', 'vxe-radio-button', {
          [`size--${vSize}`]: vSize,
          'is--disabled': isDisabled
        }],
        title: props.title
      }, [
        h('input', {
          class: 'vxe-radio--input',
          type: 'radio',
          name,
          checked,
          disabled: isDisabled,
          onChange: changeEvent,
          onClick: clickEvent
        }),
        h('span', {
          class: 'vxe-radio--label'
        }, slots.default ? slots.default({}) : getFuncText(props.content))
      ])
    }

    Object.assign($xeradiobutton, {
      renderVN,
      dispatchEvent
    })

    return renderVN
  }
})
