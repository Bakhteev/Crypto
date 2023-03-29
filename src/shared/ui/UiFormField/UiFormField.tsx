import React, { type InputHTMLAttributes } from 'react'
import cn from 'classnames'
import './UiFromField.scss'

const defaultClassname = 'ui-form-field'
const UiFormField = ({
  type,
  prefix,
  suffix,
  onChange,
  className,
  error,
  ...meta
}: UiFormFieldProps) => {
  const hasPrefix = !!prefix
  const hasSuffix = !!suffix
  const classNames = cn(defaultClassname, className, 'flex', 'align-items-center', { error }
  )
  return (
    <label className={classNames}>
      {hasPrefix && <div className='ui-form-field__prefix'>{prefix}</div>}
      <input type={type ?? 'text'} {...meta} className='ui-form-field__input' onChange={onChange} />
      {hasSuffix && <div className='ui-form-field__suffix'>{suffix}</div>}
    </label>
  )
}

export type UiFormFieldProps = {
  type?: UiFormFieldType
  prefix?: string | JSX.Element
  suffix?: string | JSX.Element
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: boolean
  value?: string | number
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'>

type UiFormFieldType = 'text' | 'password' | 'number'

export default UiFormField
