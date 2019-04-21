import React from "react";
import { render, fireEvent } from "react-testing-library";
import SelectWrapper from "./select";

const { Select, Option } = SelectWrapper;

describe("Single Select", () => {
  it("should not select any option by default", () => {
    const select = render(
      <Select initialText="Please select a fruit">
        <Option value="orange">Orange</Option>
        <Option value="apple">Apple</Option>
      </Select>
    );

    expect(select.getByText("Please select a fruit")).toBeDefined();
  });

  it("should show the options on clicking the initial text", () => {
    const select = render(
      <Select initialText="Please select a fruit">
        <Option value="orange">Orange</Option>
        <Option value="apple">Apple</Option>
      </Select>
    );

    expect(select.queryAllByText("Orange")).toHaveLength(0);
    expect(select.queryAllByText("Apple")).toHaveLength(0);

    fireEvent.click(select.getByText("Please select a fruit"));

    expect(select.queryAllByText("Orange")).toHaveLength(1);
    expect(select.queryAllByText("Apple")).toHaveLength(1);
  });

  it("on clicking a option the the initial text should change to the option label", () => {
    const select = render(
      <Select initialText="Please select a fruit">
        <Option value="orange">Orange</Option>
        <Option value="apple">Apple</Option>
      </Select>
    );
    expect(select.queryAllByText("Orange")).toHaveLength(0);
    fireEvent.click(select.getByText("Please select a fruit"));
    fireEvent.click(select.getByText("Orange"));

    expect(select.queryAllByText(/Please select/)).toHaveLength(0);
    expect(select.queryAllByText("Orange")).toHaveLength(1);
  });

  it("on select an option should get highlighted on opening the dropdown", () => {
    const select = render(
      <Select initialText="Please select a fruit">
        <Option value="orange">Orange</Option>
        <Option value="apple">Apple</Option>
      </Select>
    );
    fireEvent.click(select.getByText("Please select a fruit"));
    fireEvent.click(select.getByText("Apple"));
    const selectedItem = select.getByTestId("selected-item");
    fireEvent.click(selectedItem);
    expect(select.queryAllByText("Apple")[1]).toHaveStyle(
      `background-color: #eee`
    );
  });
  it("should close the dropdown on clicking outside", () => {
    const select = render(
      <div>
        <div>Outside Dropdown</div>
        <Select initialText="Please select a fruit">
          <Option value="orange">Orange</Option>
          <Option value="apple">Apple</Option>
        </Select>
      </div>
    );
    fireEvent.click(select.getByText("Please select a fruit"));
    expect(select.queryAllByText("Orange")).toHaveLength(1);

    fireEvent.click(select.getByText("Outside Dropdown"));
    expect(select.queryAllByText("Orange")).toHaveLength(0);

  });
});
