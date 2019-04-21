import { css } from "emotion";
const dropDown = css`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const dropDownItem = css`
  padding: 10px;
  border-bottom: 1px solid grey;
  cursor: pointer;
  text-align: center;
  &:first-of-type {
    border-top: 1px solid grey;
  }
  &:last-child {
    border-bottom: none;
  }
`;

export { dropDown, dropDownItem };
