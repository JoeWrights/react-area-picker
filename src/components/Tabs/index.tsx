/* eslint-disable no-param-reassign */
import React, { useState, useMemo, useCallback, useRef, createRef, useEffect, useLayoutEffect, RefObject } from 'react'
import classNames from 'classnames'

import './index.less'

interface TabOptionProps {
  label: string
  value: number | string
  key: string
  content: number | string | JSX.Element
  active?: boolean
  disabled?: boolean
}

interface TabsProps {
  value: number | string
  /**
   * tabs选项配置
   */
  options: TabOptionProps[]
  /**
   * 当前tab底部条的背景色
   */
  lineColor?: string
  /**
   * 当前tab底部条的高度
   */
  lineHeight?: number
  /**
   * 当前tab底部条的宽度
   */
  lineWidth?: number
  /**
   * 是否使用动画切换 Tabs
   */
  animated?: boolean
  /**
   * tab改变的回调
   */
  onChange: (val: any) => void
}

export default function Tabs({
  value,
  options,
  lineColor = '#2B6BFF',
  lineHeight = 2,
  lineWidth,
  animated = true,
  onChange = () => {}
}: TabsProps) {
  const [tabLineStyle, setTabLineStyle] = useState({})
  const [tabDomsRefs, setTabDomRefs] = useState<RefObject<any>[]>([])
  const tabLineRef = useRef(null)

  const currOptions = useMemo(() => {
    return options.map((item) => {
      return {
        ...item,
        active: item.value === value,
        disabled: !!item.disabled
      }
    })
  }, [options, value])

  const [tabOptions, setTabOptions] = useState(currOptions)

  const activeTabs = useMemo(() => tabOptions.filter((item) => item.value === value), [tabOptions, value])

  const tabItemClass = (item: TabOptionProps) => {
    const classList = ['item']
    if (item.active) {
      classList.push('active c-3')
    } else {
      classList.push('c-9')
    }
    if (item.disabled) classList.push('disabled')
    return classList.join(' ')
  }

  const tabLineClass = classNames({
    animated,
    'tab-line': true
  })

  const onClickTab = (item: TabOptionProps) => {
    if (item.disabled) return
    setTabOptions((prev) => {
      return prev.map((innerItem) => {
        innerItem.active = innerItem.key === item.key
        return innerItem
      })
    })

    if (item.value !== value) {
      onChange?.(item.value)
    }
  }

  const getDomPosition = useCallback(
    (dom: HTMLDivElement) => {
      if (!dom) return {}
      const left = dom.offsetLeft + dom.offsetWidth / 2
      return {
        height: `${lineHeight}px`,
        width: `${lineWidth || dom.getBoundingClientRect().width}px`,
        transform: `translateX(${left}px) translateX(-50%)`,
        background: lineColor
      }
    },
    [lineColor, lineHeight, lineWidth]
  )

  useEffect(() => {
    setTabDomRefs(options.map(() => createRef()))
  }, [options])

  // value changed
  useLayoutEffect(() => {
    const index = tabOptions.findIndex(({ value: val }) => val === value)
    const dom = tabDomsRefs[index]?.current
    if (dom) {
      setTabLineStyle(getDomPosition(dom))
    }
  }, [value, tabOptions, tabDomsRefs, getDomPosition])

  return (
    <div className='tabs-wrapper'>
      <div className='tabs'>
        {tabOptions.map((item, i) => {
          return (
            <div key={item.key} className={tabItemClass(item)} ref={tabDomsRefs[i]} onClick={() => onClickTab(item)}>
              {item.label}
            </div>
          )
        })}
        <div className={tabLineClass} ref={tabLineRef} style={tabLineStyle} />
      </div>
      {activeTabs.map((item) => (
        <div key={item.key} className='tabs-content'>
          {item.content}
        </div>
      ))}
    </div>
  )
}
