import React, { ChangeEventHandler, useState } from 'react'

type InputProps = {
  value?: string;
  placeholder?: string;
  onChange?: (value:string) => void; 
}

const SearchInput = ({onChange, placeholder, value} : InputProps) => {
  const [inputValue, setInputValue] = useState('')

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };
  
  return (
    <div><input required type="text" placeholder={placeholder} value={inputValue ?? ""} onChange={handleChange}/></div>
  )
}

export default SearchInput
