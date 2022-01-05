---
nav:
  title: Components
  path: /components
---

## Tabs

Demo:

基础使用

```tsx
import React, { useState, useRef } from 'react'
import { Tabs } from 'react-area-picker'
import DemoPage from '../../demo/components/DemoPage'
import DemoCard from '../../demo/components/DemoCard'

const { TabPane, useTabs } = Tabs

export default () => {
  const [opts] = useState([
    {
      title: '标签一',
      value: 1,
      key: 'province',
      content: <div style={{ fontSize: 14 }}>标签一</div>
    },
    {
      title: '标签二',
      value: 2,
      key: 'city',
      content: <div style={{ fontSize: 14 }}>标签二</div>
    },
    {
      title: '标签三',
      value: 3,
      key: 'area',
      content: <div style={{ fontSize: 14 }}>标签三</div>
    }
  ])

  const tabRender = useTabs({
    defaultValue: 1,
    options: [
      {
        title: '标签一',
        value: 1,
        key: 'province',
        content: <div style={{ fontSize: 14 }}>标签一</div>
      },
      {
        title: '标签二',
        value: 2,
        key: 'city',
        content: <div style={{ fontSize: 14 }}>标签二</div>
      },
      {
        title: '标签三',
        value: 3,
        key: 'area',
        content: <div style={{ fontSize: 14 }}>标签三</div>
      }
    ],
    onChange: (val: any) => {
      console.log(val)
    }
  })

  const tabRef = useRef(null)

  const [activeTab, setActiveTab] = useState(1)
  const tabRef2 = useRef(null)

  const handleProxyChangeTab = () => {
    tabRef.current.changeTab(2)
  }

  const handleProxyChangeTab2 = () => {
    tabRef2.current.changeTab(3)
  }

  const handleChangeTab = (val: any) => {
    console.log(val)
  }

  const handleChangeTab2 = (val: any) => {
    console.log(val)
  }

  const handleChangeTab3 = (val: any) => {
    setActiveTab(val)
  }

  return (
    <DemoPage title='Tabs'>
      <DemoCard title='基础使用'>
        <Tabs defaultValue={1} onChange={handleChangeTab}>
          <TabPane title='标签1' value={1}>
            <div style={{ fontSize: 14 }}>标签一</div>
          </TabPane>
          <TabPane title='标签2' value={2}>
            <div style={{ fontSize: 14 }}>标签二</div>
          </TabPane>
          <TabPane title='标签3' value={3}>
            <div style={{ fontSize: 14 }}>标签三</div>
          </TabPane>
        </Tabs>
      </DemoCard>

      <DemoCard title='通过options属性配置 tab 选项'>
        <Tabs options={opts} defaultValue={1} onChange={handleChangeTab2} />
      </DemoCard>

      <DemoCard title='外部 dom 事件触发 tabs 切换'>
        <>
          <button
            onClick={handleProxyChangeTab}
            style={{
              appearance: 'none',
              border: 'none',
              outline: 'none',
              borderRadius: '2px',
              padding: '4px',
              marginBottom: '10px'
            }}
          >
            切换到标签2
          </button>
          <Tabs defaultValue={1} ref={tabRef}>
            <TabPane title='标签1' value={1}>
              <div style={{ fontSize: 14 }}>标签一</div>
            </TabPane>
            <TabPane title='标签2' value={2}>
              <div style={{ fontSize: 14 }}>标签二</div>
            </TabPane>
            <TabPane title='标签3' value={3}>
              <div style={{ fontSize: 14 }}>标签三</div>
            </TabPane>
          </Tabs>
        </>
      </DemoCard>

      <DemoCard title='外部 dom 事件触发 tabs 切换（options 配置 tabs）'>
        <>
          <button
            onClick={handleProxyChangeTab2}
            style={{
              appearance: 'none',
              border: 'none',
              outline: 'none',
              borderRadius: '2px',
              padding: '4px',
              marginBottom: '10px'
            }}
          >
            切换到标签三
          </button>
          <Tabs ref={tabRef2} options={opts} activeTab={activeTab} onChange={handleChangeTab3} />
        </>
      </DemoCard>

      <DemoCard title='hooks 方式使用'>
        <div>{tabRender}</div>
      </DemoCard>
    </DemoPage>
  )
}
```

**Tabs 数据类型**

```ts
interface ITabsOption {
  title: string
  value: number | string
  key: string
  content: number | string | React.ReactNode
  active?: boolean
  disabled?: boolean
}
```

**Tabs 参数 API**

| 参数         | 描述                                         | 类型                  | 默认值   |
| ------------ | -------------------------------------------- | --------------------- | -------- |
| activeTab    | 当前激活 tab 面板的 value                    | `number \| string`    | -        |
| defaultValue | 默认激活 tab 面板的 value                    | `number \| string`    | -        |
| options      | tabs 选项配置，如果`options`配置了则优先使用 | `ITabsOption[]`       | -        |
| lineColor    | 当前 tab 底部条的背景色                      | `#2B6BFF`             |
| lineHeight   | 当前 tab 底部条的宽度                        | `number`              | 2        |
| lineWidth    | 当前 tab 底部条的宽度                        | `number`              | 自动适应 |
| animated     | 是否使用动画切换 Tabs                        | `boolean`             | true     |
| onChange     | tab 改变的回调                               | `function(val: void)` | -        |

**TabPane 参数 API**

| 参数     | 描述           | 类型               | 默认值 |
| -------- | -------------- | ------------------ | ------ |
| value    | 当前激活的 tab | `number \| string` | -      |
| title    | tab 的标题     | `string`           | -      |
| disabled | 是否禁用       | `boolean`          |
