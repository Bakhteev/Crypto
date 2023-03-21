import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import UiButton from './UiButton'

export default {
  title: 'ui/UiButton',
  component: UiButton,
  argTypes: {
    onClick: {
      description: '',
      action: 'onClick',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    children: {
      control: { type: 'text' },
    },
    errorMessage: {
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof UiIcon>

const Template: ComponentStory<typeof UiButton> = (args) => (
  <UiButton {...args} />
)

export const Default = Template.bind({})

Default.args = {
  children: 'Some text',
}

export const TextIsJsxElement = Template.bind({})
TextIsJsxElement.args = {
  children: <span>Disabled</span>,
}

export const Disabled = Template.bind({})
Disabled.args = {
  children: 'Disabled',
  disabled: true,
}
