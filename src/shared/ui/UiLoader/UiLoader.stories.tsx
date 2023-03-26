import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import UiLoader from './UiLoader';

export default {
  title: 'ui/UiLoader',
  component: UiLoader,
  argTypes: {
    width: {
      controls: {
        type: 'number'
      }
    },
    height: {
      controls: {
        type: 'number'
      }
    },
    className: {
      controls: {
        type: 'text'
      }
    }
  }
} as ComponentMeta<typeof UiLoader>;

const Template: ComponentStory<typeof UiLoader> = (args) => (
  <UiLoader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  width: 30,
  height: 30,
  className: ''
};