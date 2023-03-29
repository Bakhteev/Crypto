import React from 'react'
import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import UiSearchField from './UiSearchDropdown'
import { CurrenciesMock } from '@/mock/Currencies.mock'

//
export default {
  title: 'ui/UiSearchField',
  component: UiSearchField,
  argTypes: {
    currencies: {
      control: { type: 'object' }
    },
    isOpen: {
      control: { type: 'boolean' }
    }
  }
} as ComponentMeta<typeof UiSearchField>

const Template: ComponentStory<typeof UiSearchField> = (args) => (
  <div style={{ padding: 10, position: 'relative' }}>
    <UiSearchField {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  currencies: CurrenciesMock,
  chosenCurrency: CurrenciesMock[0]
}
