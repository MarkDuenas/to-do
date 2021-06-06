import React, { useState, useEffect } from "react";
import Form from "./Form-Function.js";
import TodoList from "./List-Function";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Navbar, Row } from "react-bootstrap";

import axios from "axios";
import "./todo.scss";

const todoAPI = "https://api-js401.herokuapp.com/api/v1/todo";

function Todo(props) {
  const [list, setList] = useState([]);
  const [listCount, setListCount] = useState(0);

  const addItem = async (item) => {
    try {
      const response = await axios.post(todoAPI, item);
      setList([...list, response.data]);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleComplete = async (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;

      try {
        const response = await axios.put(url, item);
        setList(
          list.map((listItem) =>
            listItem._id === item._id ? response.data : listItem
          )
        );
      } catch (e) {
        console.error(e);
      }
    }
  };

  const deleteItem = async (id) => {
    let url = `${todoAPI}/${id}`;

    const response = await axios.delete(url);

    const newList = list.filter(
      (listItem) => listItem._id !== response.data._id
    );

    setList(newList);
  };

  // GET THE LIST OF TODOs from API
  useEffect(async () => {
    const response = await axios.get(todoAPI);
    const getList = response.data.results;
    setList(getList);
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
                <TodoList
                  list={list}
                  handleComplete={toggleComplete}
                  handleDelete={deleteItem}
                />
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </>
  );
}

export default Todo;
