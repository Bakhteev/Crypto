import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import FormField from './FormField';

export default {
  title: 'components/FormField',
  component: FormField,
  argTypes: {
    // onInput: {
    //   description: '',
    //   action: 'onInput',
    // },
    // type: {
    //   control: {type: 'select'},
    // },
    // value: {
    //   control: 'text',
    // },
  }
} as ComponentMeta<typeof FormField>;

const Template: ComponentStory<typeof FormField> = (args) => (
  <div style={{ position: 'relative' }}>
    <FormField />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  type: 'number'
};