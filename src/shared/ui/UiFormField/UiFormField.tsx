import React, {InputHTMLAttributes} from 'react'
import cn from 'classnames'
import "./UiFromField.scss"

const defaultClassname = "ui-form-field"
const UiFormField: React.FC<UiFormFieldProps> = ({
                                                   type,
                                                   prefix,
                                                   suffix,
                                                   OnChange,
                                                   className,
                                                   ...meta
                                                 }) => {
  const hasPrefix = !!prefix
  const hasSuffix = !!suffix
  const classNames = cn(defaultClassname, className)
  return (
      <label className={classNames}>
        {hasPrefix && <div className='ui-prefix'>{prefix}</div>}
        <input type={type || 'text'} {...meta} className="ui-form-field__input"/>
        {hasSuffix && <div className='ui-suffix'>{suffix}</div>}
      </label>
  )
}

export type UiFormFieldProps = {
  // className?: string
  type?: UiFormFieldType
  suffix?: string | JSX.Element
  prefix?: JSX.Element | any //FIXME: fix type bug
  OnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
} & InputHTMLAttributes<HTMLInputElement>

type UiFormFieldType = 'text' | 'password' | 'number'

export default UiFormField
