import { defineComponent, ref, h, reactive, computed, inject, createCommentVNode, PropType } from 'vue'
import XEUtils from 'xe-utils'

import type { VxeBreadcrumbItemPropTypes, BreadcrumbItemReactData, BreadcrumbItemPrivateRef, VxeBreadcrumbItemPrivateComputed, VxeBreadcrumbItemConstructor, VxeBreadcrumbItemPrivateMethods, VxeBreadcrumbConstructor, VxeBreadcrumbPrivateMethods } from '../../../types'

export default defineComponent({
  name: 'VxeBreadcrumbItem',
  props: {
    title: String as PropType<VxeBreadcrumbItemPropTypes.Title>,
    RouterLink: Object as PropType<VxeBreadcrumbItemPropTypes.RouterLink>
  },
  emits: [],
  setup (props, context) {
    const { slots } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()

    const $xeBreadcrumb = inject<(VxeBreadcrumbConstructor & VxeBreadcrumbPrivateMethods) | null>('$xeBreadcrumb', null)

    const reactData = reactive<BreadcrumbItemReactData>({
    })

    const refMaps: BreadcrumbItemPrivateRef = {
      refElem
    }

    const computeSeparator = computed(() => {
      if ($xeBreadcrumb) {
        return $xeBreadcrumb.props.separator
      }
      return ''
    })

    const clickEvent = () => {

    }

    const computeMaps: VxeBreadcrumbItemPrivateComputed = {
    }

    const $xeBreadcrumbItem = {
      xID,
      props,
      context,
      reactData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeBreadcrumbItemConstructor & VxeBreadcrumbItemPrivateMethods

    const renderVN = () => {
      const { title } = props
      const separator = computeSeparator.value
      const defaultSlot = slots.default

      return h('span', {
        ref: refElem,
        class: 'vxe-breadcrumb-item',
        onClick: clickEvent
      }, [
        h('span', {
          class: 'vxe-breadcrumb-item--content'
        }, defaultSlot ? defaultSlot({}) : `${title || ''}`),
        separator
          ? h('span', {
            class: 'vxe-breadcrumb-item--separator'
          }, `${separator}`)
          : createCommentVNode()
      ])
    }

    $xeBreadcrumbItem.renderVN = renderVN

    return $xeBreadcrumbItem
  },
  render () {
    return this.renderVN()
  }
})
