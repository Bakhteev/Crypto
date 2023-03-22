import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {CurrenciesMock} from '@/mock/Currencies.mock'
import ExchangeForm from "@/modules/ExchangeForm/ExchangeForm";

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
  },
} as ComponentMeta<typeof ExchangeForm>

const Template: ComponentStory<typeof ExchangeForm> = (args) => (
    <ExchangeForm/>
)

export const Default = Template.bind({})

