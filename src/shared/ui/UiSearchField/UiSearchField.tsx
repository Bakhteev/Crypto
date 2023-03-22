import React, {MouseEvent, useState} from 'react'
import './UiSearchField.scss'
import arrow from '@/assets/icons/arrow.svg'
import close from '@/assets/icons/close.svg'
import {UiFormField} from '../UiFormField'
import {ICurrency} from '@/models'
import {UiSearchFieldsOption} from "@/shared/ui/UiSearchField/UiSearchFieldOption";


//FIXME: remove inline styles
const UiSearchField = ({onChange, currencies, chosenCurrency, onClick}: UiSearchFieldProps) => {
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
        <div onClick={clickOpenHandler} className="flex" style={{cursor: "pointer"}}>
          <img style={{marginLeft: 34}} src={chosenCurrency.image} alt=""/>
          <span style={{margin: "0 29px 0 12px"}}>{chosenCurrency.ticker}</span>
          <img src={arrow} alt=""/>
        </div>

        {isOpen && (
            <div
                style={{
                  position: "absolute",
                  zIndex: 10,
                  top: 0,
                  left: 0,
                  right: 0,
                  border: "1px solid #e3ebef",
                  borderCollapse: "collapse",
                  borderRadius: "5px"
                }}>
              <div style={{position: "relative"}}>
                <UiFormField onChange={onChange}
                             placeholder={'Search...'}
                             className={"no-border-bottom-radius no-border"}
                             style={{width: "100%"}}
                />
                <img
                    src={close}
                    onClick={clickOpenHandler}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      top: "50%",
                      right: "16px",
                      transform: "translateY(-50%)"
                    }}
                />
              </div>
              {currencies.length &&
                  currencies.map((currency) =>
                      //TODO: add scroll
                      <UiSearchFieldsOption
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

export type UiSearchFieldProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  currencies: ICurrency[]
  chosenCurrency: ICurrency
  onClick: (e: MouseEvent, value: ICurrency) => void
}

export default UiSearchField
