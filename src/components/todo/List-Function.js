import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup } from "react-bootstrap";

function List(props) {
  return (
    <ListGroup data-testid='list-group'>
      {props.list.map((item) => (
        <ListGroup.Item
          className='list-item'
          data-testid='list-item'
          onClick={() => props.handleComplete(item._id)}
          variant={item.complete ? "success" : "dark"}
          style={{ textDecoration: item.complete ? "line-through" : "" }}
          key={item._id}
        >
          {item.text}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default List;
