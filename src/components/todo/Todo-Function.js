import React, { useState, useEffect } from "react";
import Form from "./Form-Function.js";
import TodoList from "./List-Function";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import "./todo.scss";

function Todo(props) {
  const [list, setList] = useState([]);
  const [listCount, setListCount] = useState(0);

  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
  };

  const toggleComplete = (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let newlist = list.map((listItem) =>
        listItem._id === item._id ? item : listItem
      );
      setList(newlist);
    }
  };

  useEffect(() => {
    let list = [
      {
        _id: 1,
        complete: false,
        text: "Clean the Kitchen",
        difficulty: 3,
        assignee: "Person A",
      },
      {
        _id: 2,
        complete: false,
        text: "Do the Laundry",
        difficulty: 2,
        assignee: "Person A",
      },
      {
        _id: 3,
        complete: false,
        text: "Walk the Dog",
        difficulty: 4,
        assignee: "Person B",
      },
      {
        _id: 4,
        complete: true,
        text: "Do Homework",
        difficulty: 3,
        assignee: "Person C",
      },
      {
        _id: 5,
        complete: false,
        text: "Take a Nap",
        difficulty: 1,
        assignee: "Person B",
      },
    ];
    setList(list);
  }, []);

  useEffect(() => {
    let count = list.filter((item) => !item.complete).length;

    setListCount(count);
  }, [list]);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <header>
              <Navbar bg='dark' variant='dark' className='nav'>
                <Navbar.Brand as='h2' data-testid='title'>
                  There are {listCount} Items To Complete
                </Navbar.Brand>
              </Navbar>
            </header>
          </Col>
        </Row>
        <section className='todo'>
          <Row>
            <Col xs={6} md={4}>
              <div>
                <Form handleSubmit={addItem} />
              </div>
            </Col>

            <Col xs={6} md={8}>
              <div className='list'>
                <TodoList list={list} handleComplete={toggleComplete} />
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </>
  );
}

export default Todo;
