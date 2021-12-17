import React, { useState, useRef } from 'react'
import ActionSheet, { ActionSheetProps } from '../ActionSheet'
import Picker, { IAreaItem } from '../Picker'
import useUpdateEffect from '@/hooks/useUpdateEffect'

interface AreaPickerProps extends Omit<ActionSheetProps, 'title'> {
  visible: boolean
  title?: string
  lastCode?: number
  selectedIcon?: JSX.Element | string
  style?: React.CSSProperties
  autoConfirm?: boolean
}

export default function AreaPicker({
  visible,
  title = '选择地址',
  lastCode,
  selectedIcon,
  style,
  autoConfirm = false,
  onConfirm = () => {},
  onCancel = () => {},
  ...restProps
}: AreaPickerProps) {
  const [pickerVisible, setPickerVisible] = useState<boolean>(visible)
  const [disabledConfirm, setDisabledConfirm] = useState<boolean>(true)
  const [isFinish, setIsFinish] = useState<boolean>(false)
  const [selectedVal, setSelectedVal] = useState<IAreaItem[]>([])

  const pickerRef = useRef(null)

  const handleConfirmPicker = () => {
    onConfirm?.(selectedVal)
    setPickerVisible(false)
  }

  const handleCancelPicker = () => {
    setPickerVisible(false)
    onCancel?.()
    setSelectedVal([])
  }

  const handleSelectFinish = (data: IAreaItem[]) => {
    setIsFinish(true)
    if (autoConfirm) {
      onConfirm?.(data)
      setPickerVisible(false)
    }
  }

  const handleChangeColumn = (item: any, value: 'province' | 'city' | 'county') => {
    const idxMapper = {
      province: 0,
      city: 1,
      county: 2
    }

    const curSelected = [...selectedVal.slice(0, idxMapper[value]), { ...item }]

    setSelectedVal(curSelected)

    setIsFinish(value === 'county')
  }

  useUpdateEffect(() => {
    setDisabledConfirm(selectedVal.length !== 3)
  }, [selectedVal])

  useUpdateEffect(() => {
    if (!pickerVisible) {
      onCancel?.()
      if (!isFinish) {
        setSelectedVal([])
      }
    }

    if (pickerVisible && lastCode) {
      setTimeout(() => {
        const curPickerSelected = (pickerRef.current as any)?.selectedVal
        setSelectedVal(curPickerSelected)
      }, 0)
    }
  }, [pickerVisible])

  useUpdateEffect(() => {
    setPickerVisible(visible)
  }, [visible])

  return (
    <ActionSheet
      visible={pickerVisible}
      title={title}
      style={style}
      {...restProps}
      disabledConfirm={disabledConfirm}
      onConfirm={handleConfirmPicker}
      onCancel={handleCancelPicker}
      onClickOverlay={handleCancelPicker}
    >
      {pickerVisible ? (
        <Picker
          ref={pickerRef}
          lastCode={lastCode}
          selectedIcon={selectedIcon}
          onChangeColumn={handleChangeColumn}
          onFinish={handleSelectFinish}
        />
      ) : (
        <div />
      )}
    </ActionSheet>
  )
}
