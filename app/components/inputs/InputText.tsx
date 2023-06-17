'use client';

import CreatableSelect from 'react-select/creatable';
import { StylesConfig } from 'react-select';
import {
  UseFormRegister,
  FieldValues,
  Controller,
  Control,
} from 'react-hook-form';
import { useState } from 'react';

interface ItemList {
  value: string,
  label: string,
}

interface InputTextProps {
  id: string,
  label?: string,
  required?: boolean,
  register?: UseFormRegister<FieldValues>,
  control?: Control<FieldValues>,
  placeholder?: string,
  rows?: number,
  dropList?: ItemList[],
}

export default function InputText({
  id,
  label,
  required,
  register,
  control,
  placeholder,
  rows,
  dropList,
}: InputTextProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const registerOptions = register && { ...register(id, { required }) };
  const defaultStyles = `
  w-full
  border-2
  border-[#BDBDBD]
  rounded-xl
  outline-none
  p-4
  `;

  let bodyContent = (
    <input
      type="text"
      placeholder={placeholder}
      {...registerOptions}
      autoComplete="off"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`
      ${defaultStyles}
      ${isFocused && 'border-[#F9A109]'}
      `}
    />
  )

  if (rows) {
    bodyContent = (
      <textarea
        placeholder={placeholder}
        rows={rows}
        {...registerOptions}
        autoComplete="off"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
        ${defaultStyles}
        resize-none
        overflow-y-auto
        scrollbar
        scrollbar-w-[0.3rem]
        scrollbar-h-[0.3rem]
        scrollbar-thumb-[#F9A109]
        scrollbar-thumb-rounded-xl
        scrollbar-track-slate-500/[0.30]
        scrollbar-track-rounded-xl
        ${isFocused && 'border-[#F9A109]'}
        `}
      />
    )
  }

  const customSelectStyles: StylesConfig = {
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: () => ({ display: "none" }),
    clearIndicator: (provided) => ({
      ...provided,
      cursor: "pointer",
    }),
    control: (_, state) => ({
      display: "flex",
      backgroundColor: "#fff",
      borderRadius: ".75rem",
      border: state.isFocused ? "2px solid #F9A109" : "2px solid #BDBDBD",
      padding: ".75rem",
      cursor: "text",
      outline: "none",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: ".75rem",
      border: "1px solid #E0E0E0",
      padding: ".5rem",
    }),
    option: (provided, state) => ({
      ...provided,
      borderRadius: ".75rem",
      padding: ".75rem 1.2rem",
      backgroundColor: state.isFocused ? "#F2F2F2" : "transparent",
      color: state.isSelected ? "#34333A" : "#111827",
      fontWeight: state.isSelected ? "600" : "normal",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#F2F2F2",
        color: "#34333A",
        fontWeight: "600"
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#111827",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9CA3AF",
    }),
  };

  if (dropList) {
    bodyContent = (
      <Controller
        control={control}
        name={id}
        defaultValue=""
        rules={{ required }}
        render={({ field }) => (
          <CreatableSelect
            {...field}
            isClearable
            options={dropList}
            placeholder={placeholder}
            styles={customSelectStyles}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            maxMenuHeight={150}
          />
        )}
      />
    )
  }

  return (
    <div
      className="
      flex
      flex-col
      gap-1
      "
    >
      <label
        className={`
        text-[#34333A]
        font-bold
        text-sm
        ${isFocused && 'text-[#F9A109]'}
        `}
      >
        {label}
      </label>
      {bodyContent}
    </div>
  )
}
