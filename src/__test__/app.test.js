import { render, fireEvent } from "@testing-library/react";

import App from "../app.js";

test("should render nav bar", () => {
  const { getByTestId } = render(<App />);

  getByTestId("navbar");
});

test("should render title with items to complete", () => {
  const { getByTestId } = render(<App />);

  const header = getByTestId("title");

  expect(header.textContent).toBe("There are 4 Items To Complete");
});

test("should render form properly", () => {
  const { getByLabelText, getByTestId, getByPlaceholderText } = render(<App />);

  getByTestId("form-title");
  getByLabelText("To Do Item");
  getByPlaceholderText("Enter To Do");
  getByLabelText("Assigned To");
  getByPlaceholderText("Assignee Name");
  getByLabelText("Difficulty");
  getByTestId("form-button");
});

test("should render list of todos", () => {
  const { getByTestId, getAllByTestId } = render(<App />);

  getByTestId("list-group");
  const list = getAllByTestId("list-item");

  expect(list.length).toBe(5);
});

test("should add a todo to list", () => {
  const { getByTestId, getByPlaceholderText, getAllByTestId, getByText } =
    render(<App />);

  let todoValue = "water plants";

  const todo = getByPlaceholderText("Enter To Do");
  const assignee = getByPlaceholderText("Assignee Name");
  const form = getByTestId("main-form");

  fireEvent.change(todo, { target: { name: "text", value: todoValue } });
  fireEvent.change(assignee, { target: { name: "assignee", value: "Mark" } });

  fireEvent.submit(form);

  const list = getAllByTestId("list-item");
  expect(list.length).toBe(6);
  getByText(todoValue);
});

test("should complete todo when clicked", () => {
  const { getByText } = render(<App />);

  const task = getByText("Clean the Kitchen");

  fireEvent.click(task);

  let style = task.getAttribute("class");
  let check = style.includes("list-group-item-success");
  expect(check).toBe(true);
});

test("should render correct number of todo's left after one is completed", () => {
  const { getByText, getByTestId } = render(<App />);

  const header = getByTestId("title");

  const task = getByText("Clean the Kitchen");

  fireEvent.click(task);

  expect(header.textContent).toBe("There are 3 Items To Complete");
});
