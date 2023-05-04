import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  DropdownIndicator,
  control,
  Control,
  SelectContainer,
  ValueContainer,
  IndicatorSeparator,
  Placeholder,
  MenuList,
  Menu,
  Option,
  SingleValue,
  MultiValueContainer,
  MultiValueLabel,
  NoOptionsMessage,
} from "./SelectField/Components";
import { useField, useFormikContext } from "formik";

import customStyles from "./SelectField/customStyles";

export default function SelectField({
  name,
  label,
  options,
  required,
  isClearable,
  requires,
  requiresOptions,
  placeholder = "",
  selectAll = false,
  isMulti = false,
  ...props
}) {
  const { values, submitForm } = useFormikContext();
  const [field, meta, helpers] = useField(name);
  const [disabled, setDisabled] = useState(false);

  const { value } = meta;
  const { setValue } = helpers;

  useEffect(() => {
    if (requires) {
      setDisabled(!values[requires]);
    }
  }, [values]);

  const calculatedOptions = requiresOptions
    ? disabled
      ? []
      : values[requires] ? requiresOptions[values[requires].value] : []
    : options

  return (
    <>
      <label
        className="text-sm font-medium text-gray-700 inline-flex"
        id="headlessui-listbox-label-4"
      >
        {label}
        <span className="text-xs text-gray-500 ml-2 font-normal">
          {required ? "Required" : "Optional"}
        </span>
      </label>
      {selectAll && <div onClick={() => !disabled && setValue(calculatedOptions)} className={`text-sm -mt-5 self-end text-right font-medium underline text-congress-blue-500 cursor-pointer ${disabled ? "text-gray-600" : "cursor-pointer"}`}>
        Select All
      </div>}
      <Select
        isMulti={isMulti}
        isDisabled={disabled}
        value={disabled ? null : value}
        onChange={setValue}
        options={
          requiresOptions
            ? disabled
              ? []
              : values[requires] ? requiresOptions[values[requires].value] : []
            : options
        }
        isError={meta.touched && meta.error}
        styles={customStyles}
        isClearable={value && isClearable}
        maxMenuHeight={240}
        closeMenuOnSelect={!isMulti}
        placeholder={placeholder}
        components={{
          DropdownIndicator,
          Control,
          SelectContainer,
          ValueContainer,
          IndicatorSeparator,
          Placeholder,
          MenuList,
          Menu,
          Option,
          SingleValue,
          MultiValueContainer,
          MultiValueLabel,
          NoOptionsMessage,
        }}
      />
      {meta.touched && meta.error ? (
        <p className="mt-2 text-sm text-red-600">{(meta.error && meta.error.value )? meta.error.value : meta.error}</p>
      ) : null}
    </>
  );
}
