const customStyles = {
  container: () => ({
    marginTop: "0.25rem",
    position: "relative",
  }),
  clearIndicator: () => ({}),
  dropdownIndicator: () => ({}),
  group: () => ({}),
  groupHeading: () => ({}),
  indicatorSeparator: () => ({}),
  input: () => ({
    maxHeight: 20,
    marginTop: -4
  }),
  loadingIndicator: () => ({}),
  loadingMessage: () => ({}),
  menu: () => ({}),
  // menuList: () => ({}),
  // menuPortal: () => ({}),
  multiValue: () => ({}),
  multiValueLabel: () => ({}),
  noOptionsMessage: () => ({}),
  option: (base, state) => {
    if (state.isFocused) {
      return {
        backgroundColor: "#012758 !important",
        color: "#fff !important"
      };
    } else {
      return {color: "#111827 !important"};
    }
  },
  placeholder: () => ({}),
  singleValue: () => ({}),
  valueContainer: () => ({}),
  control: (base, state) => {
    let controlStyle = {
      borderRadius: "0.375rem",
      "--tw-shadow": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      boxShadow: "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)"
    };

    if (state.isFocused && state.selectProps.isError) {
      controlStyle = {
        boxShadow: "0 0 0 1px #EF4444",
        borderRadius: "0.375rem"
      };
    } else if (state.isFocused && state.selectProps.menuIsOpen) {
      controlStyle = {
        boxShadow: "0 0 0 1px #023E8A",
        borderRadius: "0.375rem",
      };
    }

    return controlStyle;
  },
};

export default customStyles;
