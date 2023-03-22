import React from 'react';
import {UiFormField, UiSearchField} from "@/shared/ui";
import {CurrenciesMock} from "@/mock/Currencies.mock";

const FormField = () => (
    <UiFormField type={"number"} suffix={<UiSearchField chosenCurrency={CurrenciesMock[0]}
                                                        currencies={CurrenciesMock}
                                                        onChange={() => console.log("hello")}/>}/>
);


export default FormField;