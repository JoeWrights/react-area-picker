/* eslint-disable no-param-reassign */
import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  createRef,
  useEffect,
  useLayoutEffect,
  useImperativeHandle,
  forwardRef,
  ForwardedRef,
  RefObject
} from 'react'
import classNames from 'classnames'
import TabPane from './TabPane'

import './index.less'

interface TabOptionProps {
  title: string
  value: number | string
  key: string
  content: number | string | JSX.Element
  active?: boolean
  disabled?: boolean
}

interface TabsProps {
  /**
   * 当前激活 tab 面板的 value
   */
  activeTab?: number | string
  /**
   * 默认激活 tab 面板的 value
   */
  defaultValue?: number | string
  /**
   * tabs选项配置
   */
  options?: TabOptionProps[]
  /**
   * 当前激活 tab 面板的背景色
   */
  lineColor?: string
  /**
   * 当前激活 tab 面板的高度
   */
  lineHeight?: number
  /**
   * 当前激活 tab 面板的宽度
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

function TabsWithOptions({
  tabOptions,
  activeTabs,
  tabDomsRefs,
  tabLineClass,
  tabLineStyle,
  tabLineRef,
  tabItemClass,
  onClickTab
}: {
  tabOptions?: TabOptionProps[]
  activeTabs?: TabOptionProps[]
  tabDomsRefs: RefObject<any>[]
  tabLineRef: any
  tabLineClass: any
  tabLineStyle: any
  tabItemClass: (val: any) => any
  onClickTab: (val: any) => void
}) {
  return (
    <>
      <div className='tabs'>
        {tabOptions?.map((item, i) => {
          return (
            <div
              key={item.key}
              className={tabItemClass?.(item)}
              ref={tabDomsRefs[i]}
              onClick={() => onClickTab?.(item)}
            >
              {item.title}
            </div>
          )
        })}
        <div className={tabLineClass} ref={tabLineRef} style={tabLineStyle} />
      </div>
      {activeTabs?.map((item) => (
        <div key={item.key} className='tabs-content'>
          {item.content}
        </div>
      ))}
    </>
  )
}

function TabsWithTabPane({
  curTab,
  tabItemClass,
  tabLineClass,
  tabLineRef,
  tabDomsRefs,
  tabLineStyle,
  onClickTab,
  ...rest
}: any) {
  const { children } = rest as any

  // curTabPane
  const curChild = children.find(({ props }: any) => props.value === curTab)
  return (
    <>
      <div className='tabs'>
        {children.map((child: any, i: number) => {
          return (
            <div
              key={child.props.value}
              ref={tabDomsRefs[i]}
              className={tabItemClass?.({ ...child.props, active: child.props?.value === curTab })}
              onClick={() =>
                onClickTab?.({
                  ...child.props,
                  content: child.props?.children
                })
              }
            >
              {child.props.title}
            </div>
          )
        })}
        <div className={tabLineClass} ref={tabLineRef} style={tabLineStyle} />
      </div>
      <div className='tabs-content'>{curChild}</div>
    </>
  )
}

function Tabs(
  {
    activeTab,
    defaultValue,
    options,
    lineColor = '#2B6BFF',
    lineHeight = 2,
    lineWidth,
    animated = true,
    onChange = () => {},
    ...rest
  }: TabsProps,
  ref: ForwardedRef<{
    changeTab: (val: string | number) => void
  }>
) {
  const { children: tabPaneChildren } = rest as any

  const [value, setValue] = useState(() => defaultValue)
  const [tabLineStyle, setTabLineStyle] = useState({})
  const [tabDomsRefs, setTabDomRefs] = useState<RefObject<any>[]>([])
  const tabLineRef = useRef(null)

  const proxyValue = useMemo(() => value || activeTab, [activeTab, value])

  const currOptions = useMemo(() => {
    return options?.map((item) => {
      return {
        ...item,
        active: item.value === proxyValue,
        disabled: !!item.disabled
      }
    })
  }, [options, proxyValue])

  const [tabOptions, setTabOptions] = useState(currOptions)

  const activeTabs = useMemo(() => tabOptions?.filter((item) => item.value === proxyValue), [tabOptions, proxyValue])

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
      return prev?.map((innerItem) => {
        innerItem.active = innerItem.value === item.value
        return innerItem
      })
    })

    if (item.value !== proxyValue) {
      setValue(item.value)
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
    options ? setTabDomRefs(options.map(() => createRef())) : setTabDomRefs(tabPaneChildren.map(() => createRef()))
  }, [options, tabPaneChildren])

  // value changed
  useLayoutEffect(() => {
    const tabPaneOpts = tabPaneChildren?.map(({ props }: any) => props)
    const index = (tabOptions || tabPaneOpts).findIndex(({ value: val }: any) => val === proxyValue)
    const dom = tabDomsRefs[index]?.current
    if (dom) {
      setTabLineStyle(getDomPosition(dom))
    }
  }, [proxyValue, tabOptions, tabDomsRefs, tabPaneChildren, getDomPosition])

  useImperativeHandle(ref, () => ({
    changeTab: (val: number | string) => {
      if (val !== proxyValue) {
        // use options
        if (options) {
          setTabOptions((prev) => {
            return prev?.map((innerItem) => {
              innerItem.active = innerItem.value === val
              return innerItem
            })
          })
        }
        setValue(val)
        onChange?.(val)
      }
    }
  }))

  return (
    <div className='tabs-wrapper'>
      {options ? (
        <TabsWithOptions
          activeTabs={activeTabs}
          tabOptions={tabOptions}
          tabDomsRefs={tabDomsRefs}
          tabItemClass={tabItemClass}
          tabLineClass={tabLineClass}
          tabLineRef={tabLineRef}
          tabLineStyle={tabLineStyle}
          onClickTab={onClickTab}
        />
      ) : (
        <TabsWithTabPane
          tabItemClass={tabItemClass}
          curTab={proxyValue}
          tabLineClass={tabLineClass}
          tabDomsRefs={tabDomsRefs}
          tabLineRef={tabLineRef}
          tabLineStyle={tabLineStyle}
          onClickTab={onClickTab}
        >
          {tabPaneChildren}
        </TabsWithTabPane>
      )}
    </div>
  )
}

export default forwardRef(Tabs)
