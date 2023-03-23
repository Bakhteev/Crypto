import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ExchangeForm from '@/modules/ExchangeForm/ExchangeForm';

export default {
  title: 'modules/ExchangeForm',
  component: ExchangeForm,
  argTypes: {
    // currencies: {
    //   control: {type: "object"},
    // },
    // isOpen: {
    //   control: {type: "boolean"}
    // }
  }
} as ComponentMeta<typeof ExchangeForm>;

const Template: ComponentStory<typeof ExchangeForm> = (args) => (
  <ExchangeForm />
);

export const Default = Template.bind({});

