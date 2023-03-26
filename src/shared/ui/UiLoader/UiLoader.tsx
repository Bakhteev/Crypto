import React from 'react';
import './UiLoader.scss';
import cn from 'classnames';

const defaultClassname = 'ui-loader';
const UiLoader = ({ width = 20, height = 20, className }: UiLoaderProps) => (<div style={{
  width, height
}} className={cn(defaultClassname, className)} />);

export interface UiLoaderProps {
  width?: number,
  height?: number,
  className?: string
}

export default UiLoader;
