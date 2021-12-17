import React, { useState, useMemo, useRef, useImperativeHandle, forwardRef, ForwardedRef } from 'react'
import classNames from 'classnames'
import useMount from '@/hooks/useMount'
import useUpdateEffect from '@/hooks/useUpdateEffect'
import Tabs from '../Tabs'
import {
  getProvinceList,
  getCityListByProvince,
  getCountyListByCity,
  getCountyByCode,
  getCityByCountyCode,
  getProvinceByCityCode
} from '@/helpers/area'

import './index.less'

const { TabPane } = Tabs as any

export interface IAreaItem {
  name: string
  code: number | string
}

interface ITabs {
  title: string
  value: 'province' | 'city' | 'county'
  index: number
}

interface PickerProps {
  style?: React.CSSProperties
  selectedIcon?: JSX.Element | string
  lastCode?: number
  onChangeColumn?: (data: IAreaItem, val: 'province' | 'city' | 'county') => void
  onFinish?: (val: IAreaItem[]) => void
}

const areaMap = {
  0: 'province',
  1: 'city',
  2: 'county'
} as {
  [key: string]: 'province' | 'city' | 'county'
}

function SelectedIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width='19px'
      height='13px'
      viewBox='0 0 19 13'
      version='1.1'
    >
      <g id='icon' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <g id='画板' transform='translate(-615.000000, -422.000000)' fill='currentColor' fillRule='nonzero'>
          <g id='勾/选择' transform='translate(612.000000, 416.000000)'>
            <path
              d='M19.3431547,6.3017646 C19.7840092,5.88376992 20.4802441,5.90230153 20.8982388,6.34315612 C21.2863767,6.75252109 21.2981221,7.38208643 20.9448468,7.80460568 L20.8568473,7.89824028 L10.3099527,17.8982403 C9.90341911,18.2836937 9.27903557,18.2982961 8.85614071,17.9511549 L8.76231718,17.8646281 L3.30921175,12.2249311 C2.88692066,11.7881903 2.89863449,11.0918073 3.33537532,10.6695162 C3.74092037,10.2773888 4.37034054,10.2594799 4.79629848,10.6086013 L4.8907902,10.6956798 L9.58600098,15.5520024 L19.3431547,6.3017646 Z'
              id='路径-58'
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

function Picker(
  { style, selectedIcon, lastCode, onChangeColumn = () => {}, onFinish = () => {} }: PickerProps,
  ref: ForwardedRef<any>
) {
  const [tabs, setTabs] = useState<ITabs[]>([{ title: '请选择', value: 'province', index: 0 }])

  const [activeTab, setActiveTab] = useState<'province' | 'city' | 'county'>('province')

  const [provinceList, setProvinceList] = useState<IAreaItem[]>(getProvinceList())
  const [cityList, setCityList] = useState<IAreaItem[]>([])
  const [countyList, setCountyList] = useState<IAreaItem[]>([])

  const [selectedVal, setSelectedVal] = useState<IAreaItem[]>([])

  const tabRef = useRef(null)

  const columnList = useMemo(() => {
    const listMap = {
      province: provinceList,
      city: cityList,
      county: countyList
    } as {
      province: IAreaItem[]
      city: IAreaItem[]
      county: IAreaItem[]
    }
    return listMap[activeTab]
  }, [provinceList, cityList, countyList, activeTab])

  const areaNameClass = ({ code }: IAreaItem) => {
    const curTabIdx = tabs.findIndex(({ value }) => value === activeTab)
    return classNames('name', {
      active: `${selectedVal[curTabIdx]?.code}` === `${code}`
    })
  }

  const handleSelectColumn = ({ value, index }: ITabs, item: IAreaItem) => {
    const handlerMap = {
      province: {
        fn: getCityListByProvince,
        setList: setCityList,
        value: 'city'
      },
      city: {
        fn: getCountyListByCity,
        setList: setCountyList,
        value: 'county'
      }
    } as any
    const nextColumn = handlerMap[value]?.value
    const list = nextColumn ? handlerMap[value].fn(item.code) : []

    console.log(item, 'item', nextColumn, list)

    handlerMap[value]?.setList?.(list)

    const curSelected = [...selectedVal.slice(0, index), { ...item }]

    setSelectedVal(curSelected)

    onChangeColumn?.(item, value)

    // if nextColumn's list not empty
    if (list.length > 0) {
      const nextTab = {
        index: index + 1,
        title: '请选择',
        value: nextColumn
      }

      setTabs((prev) => {
        const opts = [...prev.slice(0, index + 1), { ...nextTab }]
        if (opts[index]) {
          opts[index].title = item.name
        }
        return opts
      })

      const timer = setInterval(() => {
        setActiveTab(nextColumn)
        ;(tabRef.current as any).changeTab(nextColumn)
        clearInterval(timer)
      }, 300)
    } else {
      // reset tabs
      setTabs((prev) => {
        const opts = prev.slice(0, index + 1)
        opts[opts.length - 1].title = item.name
        return opts
      })
      onFinish?.(curSelected)
    }
  }

  const handleChangeTab = (val: any) => {
    const idx = tabs.findIndex(({ value }) => value === val) as 0 | 1 | 2
    const areaDataListMap = {
      0: provinceList,
      1: cityList,
      2: countyList
    }
    const curColumnList = areaDataListMap[idx]
    if (selectedVal[idx] && selectedVal[idx]?.code) {
      const selectedIdx = curColumnList.findIndex(({ code }) => code === selectedVal[idx]?.code)
      curColumnList.splice(selectedIdx, 1)
      curColumnList.unshift(selectedVal[idx])
    }

    setActiveTab(val)
  }

  const matchAreaByLastCode = () => {
    if (!lastCode) return

    const curCounty = getCountyByCode(lastCode)
    const curCity = getCityByCountyCode(curCounty.code)
    const curProvince = getProvinceByCityCode(curCity.code)

    const curCityList = getCityListByProvince(curProvince.code)
    const curCountyList = getCountyListByCity(curCity.code)
    const curSelectedVal = [curProvince, curCity, curCounty]

    setCityList(curCityList)
    setSelectedVal(curSelectedVal)

    setTabs(
      curSelectedVal.map((item, i) => ({
        title: item.name,
        value: areaMap[i],
        index: i
      }))
    )

    const idx = curCountyList.findIndex(({ code }) => `${code}` === `${curCounty?.code}`)
    setCountyList(() => {
      curCountyList.splice(idx, 1)
      curCountyList.unshift(curCounty as any)
      return curCountyList
    })
    setActiveTab(areaMap[curSelectedVal.length - 1])
    ;(tabRef.current as any).changeTab(areaMap[curSelectedVal.length - 1])
  }

  useImperativeHandle(ref, () => ({
    selectedVal
  }))

  useMount(() => {
    matchAreaByLastCode()
  })

  useUpdateEffect(() => {
    matchAreaByLastCode()
  }, [lastCode])

  return (
    <div className='area-picker' style={style}>
      <Tabs ref={tabRef} defaultValue='province' onChange={handleChangeTab}>
        {tabs.map((tab) => (
          <TabPane title={tab.title} value={tab.value} key={tab.value}>
            <div className='area-picker-column'>
              {columnList.map((item) => (
                <div className='area-picker-column__item' key={item.code} onClick={() => handleSelectColumn(tab, item)}>
                  <span className={areaNameClass(item)}>{item.name}</span>
                  {areaNameClass(item).includes('active') ? selectedIcon || <SelectedIcon className='ok-icon' /> : null}
                </div>
              ))}
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}

export default forwardRef(Picker)
