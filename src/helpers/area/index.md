---
nav:
  title: 辅助函数
  path: /helpers
---

## Area

Demo:

通过省份邮编获取该省的城市列表

```tsx
import React, { useState } from 'react'
import { Area } from 'react-area-picker'

const { getCityListByProvince } = Area

export default () => {
  const [val, setVal] = useState(360000)
  const [list, setList] = useState([])

  const onChange = (e) => {
    setVal(e.target.value)
  }

  const getCityListByProvinceCode = () => {
    const list = getCityListByProvince(val)
    setList(list)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input value={val} onChange={onChange} />

        <button style={{ marginLeft: 30 }} onClick={getCityListByProvinceCode}>
          getCityListByProvince
        </button>
      </div>

      <div style={{ marginTop: 30 }}>
        {list.map(({ code, name }) => (
          <li key={code}>{name}</li>
        ))}
      </div>
    </div>
  )
}
```

获取省份列表

```tsx
import React, { useState } from 'react'
import { Area } from 'react-area-picker'

const { getProvinceList } = Area

export default () => {
  const [list, setList] = useState([])

  const getList = () => {
    const list = getProvinceList()
    setList(list)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button style={{ marginLeft: 30 }} onClick={getList}>
          getProvinceList
        </button>
      </div>

      <div style={{ marginTop: 30 }}>
        {list.map(({ code, name }) => (
          <li key={code}>{name}</li>
        ))}
      </div>
    </div>
  )
}
```

通过城市邮编获取该城市的区县列表

```tsx
import React, { useState } from 'react'
import { Area } from 'react-area-picker'

const { getCountyListByCity } = Area

export default () => {
  const [val, setVal] = useState(360700)
  const [list, setList] = useState([])

  const onChange = (e) => {
    setVal(e.target.value)
  }

  const getList = () => {
    const list = getCountyListByCity(val)
    setList(list)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input value={val} onChange={onChange} />

        <button style={{ marginLeft: 30 }} onClick={getList}>
          getCountyListByCity
        </button>
      </div>

      <div style={{ marginTop: 30 }}>
        {list.map(({ code, name }) => (
          <li key={code}>{name}</li>
        ))}
      </div>
    </div>
  )
}
```

通过城市邮编获取省份信息

```tsx
import React, { useState } from 'react'
import { Area } from 'react-area-picker'

const { getProvinceByCityCode } = Area

export default () => {
  const [val, setVal] = useState(360700)
  const [info, setInfo] = useState({})

  const onChange = (e) => {
    setVal(e.target.value)
  }

  const getInfo = () => {
    const info = getProvinceByCityCode(val)
    setInfo(info)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input value={val} onChange={onChange} />

        <button style={{ marginLeft: 30 }} onClick={getInfo}>
          getProvinceByCityCode
        </button>
      </div>

      <div style={{ marginTop: 30 }}>
        {info.code && (
          <li>
            {info.code} : {info.name}
          </li>
        )}
      </div>
    </div>
  )
}
```

通过区县邮编获取城市信息

```tsx
import React, { useState } from 'react'
import { Area } from 'react-area-picker'

const { getCityByCountyCode } = Area

export default () => {
  const [val, setVal] = useState(360702)
  const [info, setInfo] = useState({})

  const onChange = (e) => {
    setVal(e.target.value)
  }

  const getInfo = () => {
    const info = getCityByCountyCode(val)
    setInfo(info)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input value={val} onChange={onChange} />

        <button style={{ marginLeft: 30 }} onClick={getInfo}>
          getCityByCountyCode
        </button>
      </div>

      <div style={{ marginTop: 30 }}>
        {info.code && (
          <li>
            {info.code} : {info.name}
          </li>
        )}
      </div>
    </div>
  )
}
```

**Area 相关接口定义**

```ts
interface IArea {
  [key: number | string]: string
}

interface IAreaData {
  province_list: {
    [code: number]: string
  }
  city_list: {
    [code: number]: string
  }
  county_list: {
    [code: number]: string
  }
}
interface IAddress {
  code: number
  name: string
}
```

**Area 所有方法**

| 方法 | 描述 | 返回类型 | 参数 |
| --- | --- | --- | --- |
| getArea | 返回所有地区数据 | `IAreaData` | 无 |
| getAreaData | 返回省 \| 市 \| 区的数据 | `{ [number]: string }` | `(type: 'province' \| 'city' \| 'county)'` |
| getProvinceList | 返回省份列表 | `IAddress[]` | 无 |
| getCityListByProvince | 通过省 code 获取该省的城市列表 | `IAddress[]` | `(code: keyof IArea)` |
| getCountyListByCity | 通过城市 code 获取该市的区县列表 | `IAddress[]` | `(code: keyof IArea)` |
| getCountyByCode | 通过区县 code 获取该区县的完整信息 | `IAddress` | `(code: keyof IArea)` |
| getCityByCountyCode | 通过县 code 获取该区县所在的城市信息 | `IAddress` | `(code: keyof IArea)` |
| getProvinceByCityCode | 通过城市 code 获取该城市所在的省份信息 | `IAddress` | `(code: keyof IArea)` |
