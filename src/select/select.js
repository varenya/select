import React, { useContext, useState, useRef } from "react";
import useOutsideClick from "./commonUtils";
import { dropDown, dropDownItem } from "./selectStyles";
import { css } from "emotion";

const SelectContext = React.createContext({
  selectedValue: "",
  onClick: () => {}
});

const { Provider } = SelectContext;

function Select(props) {
  const wrapperRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState({
    value: "",
    label: ""
  });
  const [isOpen, handleOpen] = useState(false);
  function handleClose() {
    handleOpen(false);
  }

  useOutsideClick(wrapperRef, handleClose);
  function handleClick(option) {
    setSelectedValue(option);
    handleOpen(false);
  }
  return (
    <Provider value={{ selectedValue, onClick: handleClick }}>
      <div
        ref={wrapperRef}
        className={css`
          border: 1px solid grey;
        `}
      >
        <div
          className={css`
            padding: 10px;
          `}
          data-testid="selected-item"
          onClick={() => handleOpen(!isOpen)}
        >
          {selectedValue.label || props.initialText}
        </div>
        {isOpen ? <ul className={dropDown}>{props.children}</ul> : null}
      </div>
    </Provider>
  );
}

function Option(props) {
  const { selectedValue, onClick } = useContext(SelectContext);
  const label = props.children;
  const backgroundColor = props.value === selectedValue.value ? "#eee" : "#fff";
  return (
    <li
      className={css`
        ${dropDownItem}
        background-color: ${backgroundColor};
      `}
      onClick={() => onClick({ value: props.value, label })}
    >
      {label}
    </li>
  );
}

export default { Select, Option };
