import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import UiFormField from './UiFormField.js'

export default {
  title: 'ui/UiFormField',
  component: UiFormField,
  argTypes: {
    onInput: {
      description: '',
      action: 'onInput',
    },
    type: {
      control: {type: 'select'},
    },
    value: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof UiFormField>

const Template: ComponentStory<typeof UiFormField> = (args) => (
    <UiFormField {...args}  />
)

export const Default = Template.bind({})

Default.args = {
  type: 'number',
}

export const WithSuffix = Template.bind({})

WithSuffix.args = {
  type: 'number',
  suffix: <p>suffix</p>,
}

export const WithPrefix = Template.bind({})

WithPrefix.args = {
  type: 'number',
// @ts-ignore
  //FIXME: type bug
  prefix: <p>prefix</p>,
}

// export const TextIsJsxElement = Template.bind({})
// TextIsJsxElement.args = {
//   children: <span>Disabled</span>,
// }

// export const Disabled = Template.bind({})
// Disabled.args = {
//   children: 'Disabled',
//   disabled: true,
// }