import React, {MouseEvent, useState} from 'react'
import {ICurrency} from '@/models'
import {UiFormField} from '../UiFormField'
import {UiSearchDropdownOption} from "./UiSearchDropdownOption";
import arrow from '@/assets/icons/arrow.svg'
import close from '@/assets/icons/close.svg'
import './UiSearchDropdown.scss'


//FIXME: remove inline styles
const UiSearchDropdown = ({onChange, currencies, chosenCurrency, onClick}: UiSearchDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const clickOpenHandler = () => setIsOpen((prev) => !prev)

  const chooseOptionHandler = (value: ICurrency) => {
    return (e: MouseEvent) => {
      clickOpenHandler();
      onClick(e, value);
    }
  }

  return (
      <>
        <div
            onClick={clickOpenHandler}
            className={"flex align-items-center ui-search-dropdown-closed"}
        >
          <img
              src={chosenCurrency.image}
              alt="icon"
              className={"ui-search-dropdown-closed__icon"}
          />
          <span className={"ui-search-dropdown-closed__name"}>
            {chosenCurrency.ticker}
          </span>
          <img src={arrow} alt="open"/>
        </div>

        {isOpen && (
            <div
                className={"ui-search-dropdown-opened"}
                // style={{
                //   position: "absolute",
                //   zIndex: 10,
                //   top: 0,
                //   left: 0,
                //   right: 0,
                //   border: "1px solid #e3ebef",
                //   borderCollapse: "collapse",
                //   borderRadius: "5px"
                // }}
            >
              <div style={{position: "relative"}}>
                <UiFormField onChange={onChange}
                             placeholder={'Search...'}
                             className={"no-border-bottom-radius border-bottom"}
                             suffix={<img
                                 src={close}
                                 onClick={clickOpenHandler}
                                 className={"ui-search-dropdown-opened__close-icon"}
                                 // style={{
                                 //   cursor: "pointer",
                                 //   position: "absolute",
                                 //   top: "50%",
                                 //   right: "16px",
                                 //   transform: "translateY(-50%)"
                                 // }}
                                 alt="&nbsp;"/>}
                />

              </div>
              {currencies.length &&
                  currencies.map((currency) =>
                      //TODO: add scroll
                      <UiSearchDropdownOption
                          key={currency.name + currency.ticker}
                          currency={currency}
                          onClick={chooseOptionHandler}
                      />
                  )}
            </div>
        )}
      </>
  )
}

export type UiSearchDropdownProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  currencies: ICurrency[]
  chosenCurrency: ICurrency
  onClick: (e: MouseEvent, value: ICurrency) => void
}

export default UiSearchDropdown
