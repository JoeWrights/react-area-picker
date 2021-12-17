import React, { useState, useCallback } from 'react'
import { useSpring, animated } from '@react-spring/web'
import classNames from 'classnames'
import useActionSheet from './hooks'

import './index.less'

export interface ActionSheetProps {
  /**
   * ActionSheet是否显示
   */
  visible: boolean
  /**
   * 标题
   */
  title: string
  /**
   * 操作栏的风格
   */
  toolbarMode?: 'simple' | 'confirm'
  /**
   * 自定义操作栏
   */
  renderToolbar?: JSX.Element
  /**
   * 自定义footer
   */
  renderFooter?: JSX.Element
  /**
   * 底部按钮的风格
   */
  bottomButtonMode?: 'single' | 'multi'
  /**
   * 是否需要底部按钮
   */
  needBottomButton?: boolean
  /**
   * 取消的文案
   */
  cancelText?: string
  /**
   * 取消的icon
   */
  cancelIcon?: JSX.Element | string
  /**
   * 确认的文案
   */
  confirmText?: string
  /**
   * ActionSheet内部样式
   */
  style?: React.CSSProperties
  /**
   * 操作栏是否需要底边框
   */
  needToolbarBorder?: boolean
  /**
   * 确认按钮是否禁用
   */
  disabledConfirm?: boolean
  /**
   * 遮罩的透明度
   */
  overlayOpacity?: number
  /**
   * 确认的回调
   */
  onConfirm: (...val: any) => void
  /**
   * 取消的回调
   */
  onCancel: () => void
  /**
   * 点击遮罩的回调
   */
  onClickOverlay?: () => void
}

function SimpleToolbar({
  title,
  onCancel,
  cancelIcon
}: {
  title: string
  cancelIcon?: JSX.Element | string
  onCancel: () => void
}) {
  return (
    <div className='simple'>
      <div className='title'>{title}</div>
      <div className='cancel-pla' onClick={onCancel}>
        {cancelIcon}
      </div>
    </div>
  )
}

function ConfirmToolbar({
  title,
  confirmText,
  cancelText,
  disabledConfirm,
  onCancel,
  onConfirm
}: {
  title: string
  confirmText: string
  cancelText: string
  disabledConfirm: boolean
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <div className='confirm'>
      <div className='cancel-pla' onClick={onCancel}>
        {cancelText}
      </div>
      <div className='title'>{title}</div>
      <div
        className={classNames({
          'confirm-pla': true,
          disabled: disabledConfirm
        })}
        onClick={onConfirm}
      >
        {confirmText}
      </div>
    </div>
  )
}

function CancelIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width='24px'
      height='24px'
      viewBox='0 0 24 24'
      version='1.1'
    >
      <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <g transform='translate(-14.000000, -36.000000)'>
          <g transform='translate(14.000000, 35.000000)'>
            <g transform='translate(0.000000, 1.000000)'>
              <g fill='currentColor'>
                <rect fill='#D8D8D8' opacity='0' x='0' y='0' width='24' height='24' />
                <path
                  d='M20.3341666,4.32182541 C20.7637434,4.75140213 20.7637434,5.4478836 20.3341666,5.87746033 L14.1106349,12.0996429 L20.3341666,18.3225397 C20.7637434,18.7521164 20.7637434,19.4485979 20.3341666,19.8781746 C19.9045899,20.3077513 19.2081084,20.3077513 18.7785317,19.8781746 L12.5556349,13.6546429 L6.33345238,19.8781746 C5.90387566,20.3077513 5.20739418,20.3077513 4.77781746,19.8781746 C4.34824074,19.4485979 4.34824074,18.7521164 4.77781746,18.3225397 L10.9996349,12.0996429 L4.77781746,5.87746033 C4.34824074,5.4478836 4.34824074,4.75140213 4.77781746,4.32182541 C5.20739418,3.89224869 5.90387566,3.89224869 6.33345238,4.32182541 L12.5556349,10.5436429 L18.7785317,4.32182541 C19.2081084,3.89224869 19.9045899,3.89224869 20.3341666,4.32182541 Z'
                  id='形状结合'
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

function ActionSheet({
  visible = false,
  title = '',
  renderToolbar,
  renderFooter,
  toolbarMode = 'confirm',
  bottomButtonMode = 'multi',
  needBottomButton = false,
  cancelText = '取消',
  confirmText = '确认',
  cancelIcon = <CancelIcon />,
  style,
  needToolbarBorder = true,
  disabledConfirm = false,
  overlayOpacity = 0.6,
  onConfirm = () => {},
  onCancel = () => {},
  onClickOverlay = () => {},
  ...rest
}: ActionSheetProps & { children: JSX.Element }) {
  const { children } = rest
  const [active, setActive] = useState(visible)

  const { opacity } = useSpring({
    opacity: visible ? overlayOpacity : 0,
    config: {
      precision: 0.01,
      mass: 1,
      tension: 200,
      friction: 30
    },
    onStart: () => {
      setActive(true)
    },
    onRest: () => {
      setActive(visible)
    }
  })

  const { percent } = useSpring({
    percent: visible ? 0 : 100,
    config: {
      precision: 0.1,
      mass: 0.4,
      tension: 300,
      friction: 30
    },
    onStart: () => {
      setActive(true)
    },
    onRest: () => {
      setActive(visible)
    }
  })

  const handleConfirm = useCallback(() => {
    if (disabledConfirm) return
    onConfirm?.()
  }, [disabledConfirm, onConfirm])

  const handleClickMask = () => {
    onCancel?.()
    onClickOverlay?.()
  }

  return (
    <div className='action-sheet'>
      <animated.div className='sheet-wrapper' style={{ ...style, transform: percent.to((v) => `translate(0, ${v}%)`) }}>
        <div
          className={classNames({
            toolbar: true,
            'border-b': needToolbarBorder
          })}
        >
          {renderToolbar || (
            <div className='default-bar'>
              {toolbarMode === 'simple' ? (
                <SimpleToolbar title={title} cancelIcon={cancelIcon} onCancel={onCancel} />
              ) : (
                <ConfirmToolbar
                  title={title}
                  confirmText={confirmText}
                  cancelText={cancelText}
                  disabledConfirm={disabledConfirm}
                  onCancel={onCancel}
                  onConfirm={handleConfirm}
                />
              )}
            </div>
          )}
        </div>
        <div className='content'>{children}</div>
        <div className='footer'>
          {renderFooter && 'renderFooter'}
          {!renderFooter && needBottomButton && (
            <div className='bottom-button'>
              {bottomButtonMode !== 'single' && (
                <div className='cancel-btn' onClick={onCancel}>
                  {cancelText}
                </div>
              )}
              <div
                className={classNames({
                  'confirm-btn': true,
                  disabled: disabledConfirm
                })}
                onClick={handleConfirm}
              >
                {confirmText}
              </div>
            </div>
          )}
        </div>
      </animated.div>
      <animated.div
        className='mask'
        style={{ opacity, display: active ? 'unset' : 'none' }}
        onClick={handleClickMask}
      />
    </div>
  )
}

export type ActionSheetType = typeof ActionSheet & {
  useActionSheet: (
    opt: Omit<ActionSheetProps, 'visible'> & { children: JSX.Element }
  ) => {
    actionSheetRender: JSX.Element
    hideActionSheet: () => void
    showActionSheet: () => void
    onCancel: () => void
    onClickOverlay: () => void
    onConfirm: () => void
  }
}
;(ActionSheet as ActionSheetType).useActionSheet = useActionSheet

export default ActionSheet
