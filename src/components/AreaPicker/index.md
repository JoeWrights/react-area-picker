---
nav:
  title: Components
  path: /components
---

## AreaPicker

Demo:

使用例子

```tsx
import React, { useState } from 'react'
import { AreaPicker } from 'react-area-picker'
import DemoPage from '../../demo/components/DemoPage'
import DemoCard from '../../demo/components/DemoCard'

export default () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [visible2, setVisible2] = useState<boolean>(false)
  const [visible3, setVisible3] = useState<boolean>(false)
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState([])
  const [data3, setData3] = useState([])
  const [lastCode, setLastCode] = useState()
  const [lastCode2, setLastCode2] = useState()
  const [lastCode3, setLastCode3] = useState(310109)

  const handleConfirm = (data: any) => {
    setData1(data)
    setLastCode(data?.[2]?.code)
    setVisible(false)
  }

  const handleConfirm2 = (data: any) => {
    setData2(data)
    setLastCode2(data?.[2]?.code)
    setVisible2(false)
  }

  const handleConfirm3 = (data: any) => {
    setData3(data)
    setLastCode3(data?.[2]?.code)
    setVisible3(false)
  }

  return (
    <DemoPage title='AreaPicker'>
      <DemoCard title='基础使用' onClick={() => setVisible(true)}>
        <>
          {data1.length ? data1.map(({ name }) => name).join('/') : '选择地址'}
          <AreaPicker
            visible={visible}
            style={{ height: '60%' }}
            lastCode={lastCode}
            onConfirm={handleConfirm}
            onCancel={() => setVisible(false)}
          ></AreaPicker>
        </>
      </DemoCard>

      <DemoCard title='自动确认' onClick={() => setVisible2(true)}>
        <>
          {data2.length ? data2.map(({ name }) => name).join('/') : '选择地址'}
          <AreaPicker
            visible={visible2}
            autoConfirm
            toolbarMode='simple'
            style={{ height: '60%' }}
            lastCode={lastCode2}
            onConfirm={handleConfirm2}
            onCancel={() => setVisible2(false)}
          ></AreaPicker>
        </>
      </DemoCard>

      <DemoCard title='默认选中' onClick={() => setVisible3(true)}>
        <>
          {data3.length ? data3.map(({ name }) => name).join('/') : '选择地址'}
          <AreaPicker
            visible={visible3}
            style={{ height: '60%' }}
            lastCode={lastCode3}
            onConfirm={handleConfirm3}
            onCancel={() => setVisible3(false)}
          ></AreaPicker>
        </>
      </DemoCard>
    </DemoPage>
  )
}
```

**AreaPicker 参数 API**

参数继承于`ActionSheetProps`，[详见](../ActionSheet/index.md)

| 参数           | 描述             | 类型                         | 默认值 |
| -------------- | ---------------- | ---------------------------- | ------ |
| style          | picker 的样式    | `React.CSSProperties`        | -      |
| selectedIcon   | 选中的 icon      | `string \| React.ReactNode`  | -      |
| onChangeColumn | 选中省市区的回调 | `(val: IAreaItem) => void`   | -      |
| onFinish       | 取消的回调       | `(val: IAreaItem[]) => void` | -      |
