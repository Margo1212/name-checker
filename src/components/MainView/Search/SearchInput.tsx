import React, { ChangeEventHandler, useState } from "react";
import { BiSearch } from "react-icons/bi";

type InputProps = {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
};

const SearchInput = ({ onChange, placeholder, value }: InputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <span className="text-border text-white text-lg pl-1 sm:text-sm">
          <BiSearch />
        </span>
      </div>
      <input
        className="placeholder:text-white outline-none text-white placeholder:text-opacity-80 placeholder:font-normal w-full px-10 p-2 border border-white bg-transparent rounded-[15px]"
        required
        type="text"
        placeholder={placeholder}
        value={inputValue ?? ""}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
