import { defineConfig } from 'dumi'

const repo = 'react-area-picker'

const day = (() => {
  const timeStr = new Date()
  const dayMap = {
    0: '星期日',
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六'
  }
  return dayMap[timeStr.getDay()]
})()

export default defineConfig({
  title: repo,
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  // Because of using GitHub Pages
  base: `/${repo}/`,
  publicPath: `/${repo}/`,
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/JoeWrights/react-area-picker'
    }
  ],
  themeConfig: {
    carrier: day, // 设备状态栏左侧的文本内容
    hd: {
      // 根据不同的设备屏幕宽度断点切换高清方案
      rules: [
        { maxWidth: 375, mode: 'px', options: [100, 750] },
        { minWidth: 376, maxWidth: 750, mode: 'px', options: [100, 1500] }
      ]
      // 更多 rule 配置访问 https://github.com/umijs/dumi/blob/master/packages/theme-mobile/src/typings/config.d.ts#L7
    }
  }
  // extraPostCSSPlugins: [require('postcss-plugin-border-1px')]
  // more config: https://d.umijs.org/config
})
