import XEUtils from 'xe-utils'
import { getConfig } from '@vxe-ui/core'
import DomZIndex from 'dom-zindex'

export function isEnableConf (conf: any): boolean {
  return conf && conf.enabled !== false
}

export function nextZIndex () {
  return DomZIndex.getNext()
}

export function getLastZIndex () {
  return DomZIndex.getCurrent()
}

export function getFuncText (content?: string | number | boolean | null) {
  if (content) {
    const translate = getConfig().translate
    return XEUtils.toValueString(translate ? translate('' + content) : content)
  }
  return ''
}

/**
 * 判断值为：'' | null | undefined 时都属于空值
 */
export function eqEmptyValue (cellValue: any) {
  return cellValue === null || cellValue === undefined || cellValue === ''
}
