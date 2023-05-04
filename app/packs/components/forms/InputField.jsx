import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useField, useFormikContext } from "formik";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { NumericFormat } from "react-number-format";

import "react-datepicker/dist/react-datepicker.css";

export default function InputField({
  label,
  color,
  type,
  money,
  percentage,
  required,
  ...props
}) {
  let className;
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  const [value, setValue] = useState(field.value);

  switch (color) {
    case "deep-sea":
      className =
        "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-deep-sea-500 focus:border-deep-sea-500 sm:text-sm";
      break;
    case "congress-blue":
      className =
        "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-congress-blue-500 focus:border-congress-blue-500 sm:text-sm";
      break;
    default:
      className =
        "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-deep-sea-500 focus:border-deep-sea-500 sm:text-sm";
      break;
  }

  if (meta.touched && meta.error) {
    className = money
      ? "appearance-none block w-full px-3 py-2 border border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 rounded-md shadow-sm  sm:text-sm"
      : "block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md";
  }

  if (money || percentage) {
    className = className + " pl-7";
  }

  let input;

  switch (type) {
    case "textarea":
      input = (
        <textarea
          className={(className || "") + " text-black"}
          name={name}
          type={type}
          {...field}
          {...props}
        />
      );
      break;
    case "datepicker":
      input = (
        <DatePicker
          wrapperClassName="w-full"
          className={(className || "") + " text-black"}
          {...field}
          {...props}
          selected={(field.value && new Date(field.value)) || null}
          onChange={(val) => {
            setFieldValue(field.name, val);
          }}
          // customInput={<DatePickerCustomInput />}
        />
      );
      break;
    default:
      money
        ? (input = (
            <NumericFormat
              thousandSeparator={true}
              className={(className || "") + " text-black"}
              name={name}
              value={field.value}
              onValueChange={(val) => setFieldValue(field.name, val.floatValue)}
            />
          ))
        : (input = (
            <input
              lang="en-150"
              className={(className || "") + " text-black"}
              name={name}
              type={type}
              value={
                money
                  ? field.value && field.value.toLocaleString()
                  : field.value
              }
              {...field}
              {...props}
            />
          ));
      break;
  }
  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        <span className="text-xs text-gray-500 ml-2 font-normal">
          {required ? "Required" : "Optional"}
        </span>
      </label>
      <div className="mt-1 relative">
        {money && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
        )}
        {percentage && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">%</span>
          </div>
        )}
        {input}
        {money && (
          <div className="absolute inset-y-0 right-0 pr-9 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm" id="price-currency">
              USD
            </span>
          </div>
        )}
        {!money && meta.touched && meta.error ? (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        ) : null}
      </div>
      {meta.touched && meta.error ? (
        <p className="mt-2 text-sm text-red-600">{meta.error}</p>
      ) : null}
    </div>
  );
}
