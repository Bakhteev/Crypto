import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import UiFormField from './UiFormField.js';

export default {
  title: 'ui/UiFormField',
  component: UiFormField,
  argTypes: {
    onInput: {
      description: '',
      action: 'onInput'
    },
    type: {
      control: { type: 'select' }
    },
    value: {
      control: 'text'
    }
  }
} as ComponentMeta<typeof UiFormField>;

const Template: ComponentStory<typeof UiFormField> = (args) => (
  <UiFormField {...args} />
);

export const Default = Template.bind({});

Default.args = {
  type: 'number'
};

export const WithSuffix = Template.bind({});

WithSuffix.args = {
  type: 'number',
  suffix: <p>suffix</p>
};

export const WithPrefix = Template.bind({});

WithPrefix.args = {
  type: 'number',
  prefix: <p>prefix</p>
};

export const WithError = Template.bind({});
WithError.args = {
  type: 'number',
  error: true
};

