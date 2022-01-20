# react-area-picker

一个 react 移动端地址选择组件

## 开始

### 使用 npm 或 yarn 安装:

```bash
$ npm install react-area-picker --save
```

或

```bash
$ yarn add react-area-picker
```

### 基础使用

```tsx
import React, { useState } from 'react'
import { AreaPicker } from 'react-area-picker'

export default () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [data, setData] = useState([])
  const [lastCode, setLastCode] = useState()

  const handleConfirm = (data: any) => {
    setData(data)
    setLastCode(data?.[2]?.code)
    setVisible(false)
  }

  return (
    <>
      <button onClick={() => setVisible(true)}>显示</button>
      <AreaPicker
        visible={visible}
        style={{ height: '60%' }}
        lastCode={lastCode}
        onConfirm={handleConfirm}
        onCancel={() => setVisible(false)}
      ></AreaPicker>
    </>
  )
}
```

### 快速预览

手机扫描二维码

![qrcode](demo/assets/qrcode.png)
