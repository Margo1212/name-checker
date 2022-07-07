import React, { ChangeEventHandler, useState } from 'react'

type InputProps = {
  onChange?: (value:string) => void; 
}

const SearchInput = ({onChange} : InputProps) => {
  const [value, setValue] = useState('')

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };
  
  return (
    <div><input type="text" placeholder="Enter name" value={value ?? ""} onChange={handleChange}/></div>
  )
}

export default SearchInput
