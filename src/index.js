import React from "react";
import ReactDOM from "react-dom";
import S from "./select";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <S.Select initialText="Please select a fruit">
        <S.Option value="orange">Orange</S.Option>
        <S.Option value="apple">Apple</S.Option>
      </S.Select>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
