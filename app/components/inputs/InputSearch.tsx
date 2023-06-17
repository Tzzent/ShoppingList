'use client';

import _ from 'lodash';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import Spinner from '../Spinner';

interface InputSearchProps {
  onChange: (value: string) => void;
}

export default function InputSearch({
  onChange
}: InputSearchProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = _.debounce((ev: React.ChangeEvent<HTMLInputElement>) => {
    onChange(ev.target.value);
    setIsLoading(false);
  }, 1000);

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    handleOnChange(ev);
  };

  return (
    <div
      className="
      relative
      w-full
      max-h-14
      "
    >
      <label htmlFor="input-search">
        <div
          className="
          absolute
          left-4
          top-0
          bottom-0
          flex
          items-center
          "
        >
          {isLoading ? (
            <Spinner
              loading={isLoading}
            />
          ) : (
            <AiOutlineSearch size={28} />
          )}
        </div>
        <input
          type="text"
          id="input-search"
          placeholder="search item"
          onChange={handleInputChange}
          className="
          w-full
          h-full
          pl-14
          pr-4
          py-4
          rounded-2xl
          border
          "
        />
      </label>
    </div>
  )
}
