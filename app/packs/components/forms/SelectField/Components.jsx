import React from "react";
import { components } from "react-select";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const SelectContainer = ({ children, ...rest }) => (
  <components.SelectContainer {...rest}>
    <div className="mt-1 relative">{children}</div>
  </components.SelectContainer>
);

export const MenuList = ({ children, ...rest }) => (
  <components.MenuList {...rest}>{children}</components.MenuList>
);

export const Menu = ({ children, ...rest }) => (
  <components.Menu {...rest}>
    <ul
      className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm overflow-scroll"
      role="listbox"
      tabIndex="0"
    >
      {children}
    </ul>
  </components.Menu>
);

export const NoOptionsMessage = ({ children, ...rest }) => {
  return (
    <components.NoOptionsMessage {...rest}>
      <li
        className="cursor-default select-none relative py-2 pl-3 pr-9"
        role="option"
        tabIndex="-1"
      >
        No Options
      </li>
    </components.NoOptionsMessage>
  );
};

export const Option = ({ children, ...rest }) => (
  <components.Option {...rest}>
    <li
      className="cursor-pointer select-none py-2 pl-3 pr-9"
      role="option"
      tabIndex="-1"
    >
      <span className="font-normal block">{children}</span>
    </li>
  </components.Option>
);

export const IndicatorSeparator = ({ children, ...rest }) => <components.IndicatorSeparator {...rest}>{children}</components.IndicatorSeparator>

export const Placeholder = ({ children, ...rest }) => <components.Placeholder {...rest}>{children}</components.Placeholder>

export const ValueContainer = ({ children, ...rest }) => (
  <components.ValueContainer {...rest}>
    <div
      className={classNames("flex items-center", rest.isMulti ? "flex-row flex-wrap gap-1" : "")}
      style={{ minHeight: 20 }}
    >
      {children}
    </div>
  </components.ValueContainer>
);

export const MultiValueContainer = ({ children, ...rest }) => (
  <components.MultiValueContainer {...rest}>
    <div className="flex flex-row bg-gray-100 mr-1" style={{ minHeight: 20 }}>{children}</div>
  </components.MultiValueContainer>
);

export const SingleValue = ({ children, ...rest }) => (
  <components.SingleValue {...rest}>
    <div
      className="leading-5 text-black"
    >
      {children}
    </div>
  </components.SingleValue>
);

export const MultiValueLabel = ({ children, ...rest }) => (
  <components.MultiValueLabel {...rest}>
    <div className="leading-5 px-1">{children}</div>
  </components.MultiValueLabel>
);

export const MultiValueRemove = ({ children, ...rest }) => (
  <components.MultiValueRemove {...rest}>
    <div className="leading-5 bg-gray-300">{children}</div>
  </components.MultiValueRemove>
);

export const Control = ({ children, ...rest }) => {
  const className = rest.selectProps.isError
    ? "bg-white relative w-full border border-red-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:hover:shadow-md focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm flex flex-row justify-between"
    : "bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:hover:shadow-md focus:ring-1 focus:ring-congress-blue-500 focus:border-congress-blue-500 sm:text-sm flex flex-row justify-between";

  return (
    <components.Control {...rest}>
      <button
        className={classNames(
          className,
          rest.selectProps.menuIsOpen ? "border-congress-blue-500" : "",
          rest.selectProps.isDisabled
            ? "bg-gray-50 text-gray-500 cursor-not-allowed"
            : "cursor-pointer"
        )}
        type="button"
        aria-haspopup="true"
      >
        {rest.selectProps.isDisabled && "Disabled"}
        {children}
      </button>
    </components.Control>
  );
};

export const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </components.DropdownIndicator>
  );
};
