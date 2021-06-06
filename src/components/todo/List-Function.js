import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toast, Badge } from "react-bootstrap";

function List(props) {
  return (
    <>
      {props.list.map((item) => (
        <Toast key={item._id}>
          <Toast.Header closeButton={false}>
            <Badge pill variant={item.complete ? "success" : "danger"}>
              {item.complete ? "Complete" : "Pending"}
            </Badge>
            <strong className='mr-auto'>{item.assignee}</strong>
            <button
              type='button'
              class='close ml-2 mb-1'
              data-dismiss='toast'
              onClick={() => props.handleDelete(item._id)}
            >
              <span aria-hidden='true'>×</span>
              <span class='sr-only'>Close</span>
            </button>
          </Toast.Header>
          <Toast.Body
            className='list-item'
            data-testid='list-item'
            onClick={() => props.handleComplete(item._id)}
            style={{ textDecoration: item.complete ? "line-through" : "" }}
          >
            {item.text}
            <br />
            <small> Difficulty: {item.difficulty}</small>
          </Toast.Body>
        </Toast>
      ))}
    </>
  );
}

export default List;
