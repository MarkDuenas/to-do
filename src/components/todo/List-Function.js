import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toast, Badge, Pagination } from "react-bootstrap";
import Auth from "../../auth/Auth.js";
import { LoginContext } from "../../context/LoginProvider.js";

function List(props) {
  const userContext = useContext(LoginContext);

  let items = [];

  for (
    let number = 1;
    number <= Math.ceil(props.totalTodo / props.todoPerPage);
    number++
  ) {
    items.push(
      <Pagination.Item
        onClick={() => props.changePage(number)}
        key={number}
        active={number === props.currentPage}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      {props.list.map((item) => (
        <Toast key={item._id}>
          <Toast.Header closeButton={false}>
            <Badge
              pill
              variant={item.complete ? "success" : "danger"}
              onClick={
                userContext.user.access &&
                userContext.user.access.includes("update")
                  ? () => props.handleComplete(item._id)
                  : () => console.log("Sorry you cant do this.")
              }
            >
              {item.complete ? "Complete" : "Pending"}
            </Badge>
            <strong className='mr-auto'>{item.assignee}</strong>
            <Auth capability='delete'>
              <button
                type='button'
                class='close ml-2 mb-1'
                data-dismiss='toast'
                onClick={() => props.handleDelete(item._id)}
              >
                <span aria-hidden='true'>×</span>
                <span class='sr-only'>Close</span>
              </button>
            </Auth>
          </Toast.Header>
          <Toast.Body
            className='list-item'
            data-testid='list-item'
            // onClick={() => props.handleComplete(item._id)}
            style={{ textDecoration: item.complete ? "line-through" : "" }}
          >
            {item.text}
            <br />
            <small> Difficulty: {item.difficulty}</small>
          </Toast.Body>
        </Toast>
      ))}
      <Pagination>{items}</Pagination>
    </>
  );
}

export default List;
