import { defineComponent, h, ref, Ref, computed, Teleport, VNode, onUnmounted, reactive, nextTick, PropType, onMounted, inject } from 'vue'
import XEUtils from 'xe-utils'
import { getConfig, globalEvents, log, getIcon, createEvent, useSize } from '@vxe-ui/core'
import { getAbsolutePos, getEventTargetNode } from '../../ui/src/dom'
import { getFuncText, getLastZIndex, nextZIndex } from '../../ui/src/utils'

import type { VxeButtonConstructor, VxeButtonPropTypes, VxeButtonEmits, ButtonReactData, ButtonMethods, ButtonPrivateRef, ButtonInternalData, VxeButtonGroupConstructor, VxeButtonGroupPrivateMethods } from '../../../types'

export default defineComponent({
  name: 'VxeButton',
  props: {
    /**
     * 按钮类型
     */
    type: String as PropType<VxeButtonPropTypes.Type>,
    mode: String as PropType<VxeButtonPropTypes.Mode>,
    className: [String, Function] as PropType<VxeButtonPropTypes.ClassName>,
    popupClassName: [String, Function] as PropType<VxeButtonPropTypes.PopupClassName>,
    /**
     * 按钮尺寸
     */
    size: { type: String as PropType<VxeButtonPropTypes.Size>, default: () => getConfig().button.size || getConfig().size },
    /**
     * 用来标识这一项
     */
    name: [String, Number] as PropType<VxeButtonPropTypes.Name>,
    /**
     * 按钮内容
     */
    content: String as PropType<VxeButtonPropTypes.Content>,
    /**
     * 固定显示下拉面板的方向
     */
    placement: String as PropType<VxeButtonPropTypes.Placement>,
    /**
     * 按钮状态
     */
    status: String as PropType<VxeButtonPropTypes.Status>,
    /**
     * 标题
     */
    title: String as PropType<VxeButtonPropTypes.Title>,
    /**
     * 按钮的图标
     */
    icon: String as PropType<VxeButtonPropTypes.Icon>,
    /**
     * 圆角边框
     */
    round: Boolean as PropType<VxeButtonPropTypes.Round>,
    /**
     * 圆角按钮
     */
    circle: Boolean as PropType<VxeButtonPropTypes.Circle>,
    /**
     * 是否禁用
     */
    disabled: Boolean as PropType<VxeButtonPropTypes.Disabled>,
    /**
     * 是否加载中
     */
    loading: Boolean as PropType<VxeButtonPropTypes.Loading>,
    /**
     * 在下拉面板关闭时销毁内容
     */
    destroyOnClose: Boolean as PropType<VxeButtonPropTypes.DestroyOnClose>,
    /**
     * 是否将弹框容器插入于 body 内
     */
    transfer: { type: Boolean as PropType<VxeButtonPropTypes.Transfer>, default: () => getConfig().button.transfer }
  },
  emits: [
    'click',
    'mouseenter',
    'mouseleave',
    'dropdown-click'
  ] as VxeButtonEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

    const reactData = reactive<ButtonReactData>({
      inited: false,
      showPanel: false,
      animatVisible: false,
      panelIndex: 0,
      panelStyle: {},
      panelPlacement: ''
    })

    const internalData: ButtonInternalData = {
      showTime: null
    }

    const refElem = ref() as Ref<HTMLDivElement>
    const refButton = ref() as Ref<HTMLButtonElement>
    const refBtnPanel = ref() as Ref<HTMLDivElement>

    const refMaps: ButtonPrivateRef = {
      refElem
    }

    const $xeButton = {
      xID,
      props,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps
    } as unknown as VxeButtonConstructor

    const $xeButtonGroup = inject<(VxeButtonGroupConstructor & VxeButtonGroupPrivateMethods) | null>('$xeButtonGroup', null)

    let buttonMethods = {} as ButtonMethods

    const computeIsFormBtn = computed(() => {
      const { type } = props
      if (type) {
        return ['submit', 'reset', 'button'].indexOf(type) > -1
      }
      return false
    })

    const computeBtnMode = computed(() => {
      const { type, mode } = props
      if (mode === 'text' || type === 'text' || ($xeButtonGroup && $xeButtonGroup.props.mode === 'text')) {
        return 'text'
      }
      return 'button'
    })

    const computeBtnStatus = computed(() => {
      const { status } = props
      if (status) {
        return status
      }
      if ($xeButtonGroup) {
        return $xeButtonGroup.props.status
      }
      return ''
    })

    const computeBtnRound = computed(() => {
      const { round } = props
      if (round) {
        return round
      }
      if ($xeButtonGroup) {
        return $xeButtonGroup.props.round
      }
      return false
    })

    const computeBtnCircle = computed(() => {
      const { circle } = props
      if (circle) {
        return circle
      }
      if ($xeButtonGroup) {
        return $xeButtonGroup.props.circle
      }
      return false
    })

    const updateZindex = () => {
      if (reactData.panelIndex < getLastZIndex()) {
        reactData.panelIndex = nextZIndex()
      }
    }

    const updatePlacement = () => {
      return nextTick().then(() => {
        const { transfer, placement } = props
        const { panelIndex } = reactData
        const targetElem = refButton.value
        const panelElem = refBtnPanel.value
        if (panelElem && targetElem) {
          const targetHeight = targetElem.offsetHeight
          const targetWidth = targetElem.offsetWidth
          const panelHeight = panelElem.offsetHeight
          const panelWidth = panelElem.offsetWidth
          const marginSize = 5
          const panelStyle: { [key: string]: string | number } = {
            zIndex: panelIndex
          }
          const { top, left, boundingTop, visibleHeight, visibleWidth } = getAbsolutePos(targetElem)
          let panelPlacement = 'bottom'
          if (transfer) {
            let btnLeft = left + targetWidth - panelWidth
            let btnTop = top + targetHeight
            if (placement === 'top') {
              panelPlacement = 'top'
              btnTop = top - panelHeight
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (boundingTop + targetHeight + panelHeight + marginSize > visibleHeight) {
                panelPlacement = 'top'
                btnTop = top - panelHeight
              }
              // 如果上面不够放，则向下（优先）
              if (btnTop < marginSize) {
                panelPlacement = 'bottom'
                btnTop = top + targetHeight
              }
            }
            // 如果溢出右边
            if (btnLeft + panelWidth + marginSize > visibleWidth) {
              btnLeft -= btnLeft + panelWidth + marginSize - visibleWidth
            }
            // 如果溢出左边
            if (btnLeft < marginSize) {
              btnLeft = marginSize
            }
            Object.assign(panelStyle, {
              left: `${btnLeft}px`,
              right: 'auto',
              top: `${btnTop}px`,
              minWidth: `${targetWidth}px`
            })
          } else {
            if (placement === 'top') {
              panelPlacement = 'top'
              panelStyle.bottom = `${targetHeight}px`
            } else if (!placement) {
              // 如果下面不够放，则向上
              if (boundingTop + targetHeight + panelHeight > visibleHeight) {
                // 如果上面不够放，则向下（优先）
                if (boundingTop - targetHeight - panelHeight > marginSize) {
                  panelPlacement = 'top'
                  panelStyle.bottom = `${targetHeight}px`
                }
              }
            }
          }
          reactData.panelStyle = panelStyle
          reactData.panelPlacement = panelPlacement
          return nextTick()
        }
      })
    }

    const clickEvent = (evnt: Event) => {
      if ($xeButtonGroup) {
        $xeButtonGroup.handleClick({ name: props.name as string }, evnt)
      } else {
        buttonMethods.dispatchEvent('click', { $event: evnt }, evnt)
      }
    }

    const mousedownDropdownEvent = (evnt: MouseEvent) => {
      const isLeftBtn = evnt.button === 0
      if (isLeftBtn) {
        evnt.stopPropagation()
      }
    }

    const clickDropdownEvent = (evnt: Event) => {
      const dropdownElem = evnt.currentTarget
      const panelElem = refBtnPanel.value
      const { flag, targetElem } = getEventTargetNode(evnt, dropdownElem, 'vxe-button')
      if (flag) {
        if (panelElem) {
          panelElem.dataset.active = 'N'
        }
        reactData.showPanel = false
        setTimeout(() => {
          if (!panelElem || panelElem.dataset.active !== 'Y') {
            reactData.animatVisible = false
          }
        }, 350)
        buttonMethods.dispatchEvent('dropdown-click', { name: targetElem.getAttribute('name'), $event: evnt }, evnt)
      }
    }

    const mouseenterDropdownEvent = () => {
      const panelElem = refBtnPanel.value
      if (panelElem) {
        panelElem.dataset.active = 'Y'
        reactData.animatVisible = true
        setTimeout(() => {
          if (panelElem.dataset.active === 'Y') {
            reactData.showPanel = true
            updateZindex()
            updatePlacement()
            setTimeout(() => {
              if (reactData.showPanel) {
                updatePlacement()
              }
            }, 50)
          }
        }, 20)
      }
    }

    const mouseenterTargetEvent = (evnt: MouseEvent) => {
      const panelElem = refBtnPanel.value
      if (panelElem) {
        panelElem.dataset.active = 'Y'
        if (!reactData.inited) {
          reactData.inited = true
        }
        internalData.showTime = setTimeout(() => {
          if (panelElem.dataset.active === 'Y') {
            mouseenterDropdownEvent()
          } else {
            reactData.animatVisible = false
          }
        }, 250)
      }
      mouseenterEvent(evnt)
    }

    const mouseleaveTargetEvent = (evnt: MouseEvent) => {
      closePanel()
      mouseleaveEvent(evnt)
    }

    const mouseenterEvent = (evnt: MouseEvent) => {
      emit('mouseenter', createEvent(evnt, {}))
    }

    const mouseleaveEvent = (evnt: MouseEvent) => {
      emit('mouseleave', createEvent(evnt, {}))
    }

    const closePanel = () => {
      const panelElem = refBtnPanel.value
      clearTimeout(internalData.showTime)
      if (panelElem) {
        panelElem.dataset.active = 'N'
        setTimeout(() => {
          if (panelElem.dataset.active !== 'Y') {
            reactData.showPanel = false
            setTimeout(() => {
              if (panelElem.dataset.active !== 'Y') {
                reactData.animatVisible = false
              }
            }, 350)
          }
        }, 100)
      } else {
        reactData.animatVisible = false
        reactData.showPanel = false
      }
    }

    const mouseleaveDropdownEvent = () => {
      closePanel()
    }

    const renderContent = () => {
      const { content, icon, loading } = props
      const contVNs: VNode[] = []
      if (loading) {
        contVNs.push(
          h('i', {
            class: ['vxe-button--loading-icon', getIcon().BUTTON_LOADING]
          })
        )
      } else if (slots.icon) {
        contVNs.push(
          h('span', {
            class: 'vxe-button--custom-icon'
          }, slots.icon({}))
        )
      } else if (icon) {
        contVNs.push(
          h('i', {
            class: ['vxe-button--icon', icon]
          })
        )
      }
      if (slots.default) {
        contVNs.push(
          h('span', {
            class: 'vxe-button--content'
          }, slots.default({}))
        )
      } else if (content) {
        contVNs.push(
          h('span', {
            class: 'vxe-button--content'
          }, getFuncText(content))
        )
      }
      return contVNs
    }

    buttonMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, createEvent(evnt, { $button: $xeButton }, params))
      },
      focus () {
        const btnElem = refButton.value
        btnElem.focus()
        return nextTick()
      },
      blur () {
        const btnElem = refButton.value
        btnElem.blur()
        return nextTick()
      }
    }

    Object.assign($xeButton, buttonMethods)

    onMounted(() => {
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        if (props.type === 'text') {
          log.warn('vxe.error.delProp', ['type=text', 'mode=text'])
        }
      }

      globalEvents.on($xeButton, 'mousewheel', (evnt: Event) => {
        const panelElem = refBtnPanel.value
        if (reactData.showPanel && !getEventTargetNode(evnt, panelElem).flag) {
          closePanel()
        }
      })
    })

    onUnmounted(() => {
      globalEvents.off($xeButton, 'mousewheel')
    })

    const renderVN = () => {
      const { className, popupClassName, transfer, title, type, destroyOnClose, name, disabled, loading } = props
      const { inited, showPanel } = reactData
      const isFormBtn = computeIsFormBtn.value
      const btnMode = computeBtnMode.value
      const btnStatus = computeBtnStatus.value
      const btnRound = computeBtnRound.value
      const btnCircle = computeBtnCircle.value
      const vSize = computeSize.value
      if (slots.dropdowns) {
        return h('div', {
          ref: refElem,
          class: ['vxe-button--dropdown', className ? (XEUtils.isFunction(className) ? className({ $button: $xeButton }) : className) : '', {
            [`size--${vSize}`]: vSize,
            'is--active': showPanel
          }]
        }, [
          h('button', {
            ref: refButton,
            class: ['vxe-button', `type--${btnMode}`, {
              [`size--${vSize}`]: vSize,
              [`theme--${btnStatus}`]: btnStatus,
              'is--round': btnRound,
              'is--circle': btnCircle,
              'is--disabled': disabled || loading,
              'is--loading': loading
            }],
            title,
            name,
            type: isFormBtn ? type : 'button',
            disabled: disabled || loading,
            onMouseenter: mouseenterTargetEvent,
            onMouseleave: mouseleaveTargetEvent,
            onClick: clickEvent
          }, renderContent().concat([
            h('i', {
              class: `vxe-button--dropdown-arrow ${getIcon().BUTTON_DROPDOWN}`
            })
          ])),
          h(Teleport, {
            to: 'body',
            disabled: transfer ? !inited : true
          }, [
            h('div', {
              ref: refBtnPanel,
              class: ['vxe-button--dropdown-panel', popupClassName ? (XEUtils.isFunction(popupClassName) ? popupClassName({ $button: $xeButton }) : popupClassName) : '', {
                [`size--${vSize}`]: vSize,
                'animat--leave': reactData.animatVisible,
                'animat--enter': showPanel
              }],
              placement: reactData.panelPlacement,
              style: reactData.panelStyle
            }, inited
              ? [
                  h('div', {
                    class: 'vxe-button--dropdown-wrapper',
                    onMousedown: mousedownDropdownEvent,
                    onClick: clickDropdownEvent,
                    onMouseenter: mouseenterDropdownEvent,
                    onMouseleave: mouseleaveDropdownEvent
                  }, destroyOnClose && !showPanel ? [] : slots.dropdowns({}))
                ]
              : [])
          ])
        ])
      }
      return h('button', {
        ref: refButton,
        class: ['vxe-button', `type--${btnMode}`, className ? (XEUtils.isFunction(className) ? className({ $button: $xeButton }) : className) : '', {
          [`size--${vSize}`]: vSize,
          [`theme--${btnStatus}`]: btnStatus,
          'is--round': btnRound,
          'is--circle': btnCircle,
          'is--disabled': disabled || loading,
          'is--loading': loading
        }],
        title,
        name,
        type: isFormBtn ? type : 'button',
        disabled: disabled || loading,
        onClick: clickEvent,
        onMouseenter: mouseenterEvent,
        onMouseleave: mouseleaveEvent
      }, renderContent())
    }

    $xeButton.renderVN = renderVN

    return $xeButton
  },
  render () {
    return this.renderVN()
  }
})
