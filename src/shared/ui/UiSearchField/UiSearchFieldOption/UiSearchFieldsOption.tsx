import React, {MouseEvent} from 'react';
import {ICurrency} from "@/models";

//FIXME: remove inline styles
const UiSearchFieldsOption = ({currency, onClick}: UiSearchFieldsOption) => {
  const {ticker, name, image} = currency
  return (
      <div onClick={onClick(currency)}
           className={"flex"}
           style={{
             padding: "14px 16px",
             background: "#F6F7F8",
             alignItems: "center",
           }}>
        <img src={image} alt=""/>
        <span style={{margin: "0 16px 0 12px", fontSize: 16, lineHeight: "144%"}}>{ticker}</span>
        <span style={{fontSize: 16, lineHeight: "144%", color: "#80A2B6"}}>{name}</span>
      </div>
  );
};

export type UiSearchFieldsOption = {
  onClick: ( value: ICurrency) => (e:MouseEvent) => void
  currency: ICurrency
}
export default UiSearchFieldsOption;