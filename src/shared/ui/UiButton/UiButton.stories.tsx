import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
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
      control: {type: 'text'},
    },
    errorMessage: {
      control: {type: 'text'},
    },
  },
} as ComponentMeta<typeof UiButton>

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
