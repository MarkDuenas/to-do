import { render, fireEvent, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import App from "../app.js";

test("should render nav bar", () => {
  const { getByTestId } = render(<App />);

  getByTestId("navbar");
});

test("should render title with items to complete", async () => {
  const { getByTestId } = render(<App />);

  const header = getByTestId("title");

  await waitFor(() => {
    expect(header.textContent).toBe("There are 0 Items To Complete");
  });
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

test("should render list of todos", async () => {
  const { getAllByTestId } = render(<App />);

  await waitFor(() => {
    getAllByTestId("list-item");
  });
});

// test("should add a todo to list", async () => {
//   let list;
//   let listLength;
//   const { getByTestId, getByPlaceholderText, getAllByTestId, getByText } =
//     render(<App />);

//   let todoValue = "water plants";

//   const todo = getByPlaceholderText("Enter To Do");
//   const assignee = getByPlaceholderText("Assignee Name");
//   const form = getByTestId("main-form");

//   fireEvent.change(todo, { target: { name: "text", value: todoValue } });
//   fireEvent.change(assignee, { target: { name: "assignee", value: "Mark" } });

//   await waitFor(() => {
//     list = getAllByTestId("list-item");
//     listLength = list.length;

//     // fireEvent.submit(form);

//     // expect(list.length).toBe(listLength + 1);
//     // getByText(todoValue);
//   });

//   fireEvent.submit(form);

//   await waitFor(() => {
//     list = getAllByTestId("list-item");
//     expect(list.length).toBe(listLength + 1);
//     getByText(todoValue);
//   });

  // const list = getAllByTestId("list-item");
  // let listLength = list.length;

  // fireEvent.submit(form);

  // expect(list.length).toBe(listLength + 1);
  // getByText(todoValue);
});

// test("should complete todo when clicked", () => {
//   const { getByText, getAllByTestId } = render(<App />);

//   const task = getAllByTestId("list-item");

//   fireEvent.click(task);

//   let style = task.getAttribute("class");
//   let check = style.includes("list-group-item-success");
//   expect(check).toBe(true);
// });

// test("should render correct number of todo's left after one is completed", () => {
//   const { getByText, getByTestId } = render(<App />);

//   const header = getByTestId("title");

//   const task = getByText("Clean the Kitchen");

//   fireEvent.click(task);

//   expect(header.textContent).toBe("There are 3 Items To Complete");
// });
