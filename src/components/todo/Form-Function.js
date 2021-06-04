import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Form, Button } from "react-bootstrap";
import "./todo.scss";

function ToDoForm(props) {
  const [item, setItem] = useState({});

  const handleInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();

    props.handleSubmit(item);
    setItem({});
  };
  return (
    <Card className='form'>
      <Container>
        <h3 data-testid='form-title'>Add Item</h3>
        <Form onSubmit={handleSubmit} data-testid='main-form'>
          <Form.Group controlId='text'>
            <Form.Label>To Do Item</Form.Label>
            <Form.Control
              onChange={handleInputChange}
              type='text'
              placeholder='Enter To Do'
              name='text'
              // value={item.text}
            />
          </Form.Group>
          <Form.Group controlId='assignee'>
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              onChange={handleInputChange}
              type='text'
              placeholder='Assignee Name'
              name='assignee'
              // value={item.assignee}
            />
          </Form.Group>
          <Form.Group controlId='difficulty'>
            <Form.Label>Difficulty</Form.Label>
            <Form.Control
              onChange={handleInputChange}
              type='range'
              defaultValue='1'
              min='1'
              max='5'
              name='difficulty'
              // value={item.difficulty}
            />
          </Form.Group>
          <Button data-testid='form-button' variant='primary' type='submit'>
            Add Item
          </Button>
        </Form>
      </Container>
    </Card>
  );
}

export default ToDoForm;
