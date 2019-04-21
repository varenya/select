import React, { useContext, useState } from "react";
import { css } from "emotion";

const SelectContext = React.createContext({
  selectedValue: "",
  onClick: () => {}
});

const labelStyle = css``;

const { Provider } = SelectContext;

function Select(props) {
  const [selectedValue, setSelectedValue] = useState({
    value: "",
    label: ""
  });
  const [isOpen, handleOpen] = useState(false);
  function handleClick(option) {
    setSelectedValue(option);
    handleOpen(false);
  }
  return (
    <Provider value={{ selectedValue, onClick: handleClick }}>
      <div
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
        {isOpen ? (
          <ul
            className={css`
              list-style: none;
              padding: 0;
              margin: 0;
              & li {
                padding: 10px;
                border-bottom: 1px solid grey;
                cursor: pointer;
                text-align: center;
              }

              & li:first-child {
                border-top: 1px solid grey;
              }
              & li:last-child {
                border-bottom: none;
              }
            `}
          >
            {props.children}
          </ul>
        ) : null}
      </div>
    </Provider>
  );
}

function Option(props) {
  const { selectedValue, onClick } = useContext(SelectContext);
  const label = props.children;
  const backgroundColor = props.value === selectedValue ? "grey" : "#fff";
  return (
    <li
      className={css`
        background-color: ${backgroundColor};
      `}
      onClick={() => onClick({ value: props.value, label })}
    >
      {label}
    </li>
  );
}

export default { Select, Option };
