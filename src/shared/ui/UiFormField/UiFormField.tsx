import React, { InputHTMLAttributes } from 'react';
import cn from 'classnames';
import './UiFromField.scss';

const defaultClassname = 'ui-form-field';
const UiFormField: React.FC<UiFormFieldProps> = ({
                                                   type,
                                                   prefix,
                                                   suffix,
                                                   OnChange,
                                                   className,
                                                   error,
                                                   ...meta
                                                 }) => {
  const hasPrefix = !!prefix;
  const hasSuffix = !!suffix;
  const classNames = cn(defaultClassname, className, 'flex', 'align-items-center', { error }
  );
  return (
    <label className={classNames}>
      {hasPrefix && <div className='ui-form-field__prefix'>{prefix}</div>}
      <input type={type || 'text'} {...meta} className='ui-form-field__input' />
      {hasSuffix && <div className='ui-form-field__suffix'>{suffix}</div>}
    </label>
  );
};

// type customValue = Omit<InputHTMLAttributes<HTMLInputElement>, 'value'>;

export type UiFormFieldProps = {
  type?: UiFormFieldType;
  suffix?: string | JSX.Element;
  prefix?: JSX.Element | any;
  OnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  value?: string | number
} & InputHTMLAttributes<HTMLInputElement>

type UiFormFieldType = 'text' | 'password' | 'number'

export default UiFormField;
