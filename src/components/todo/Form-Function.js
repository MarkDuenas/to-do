import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Form, Button } from "react-bootstrap";
// import "./todo.scss";

function ToDoForm(props) {
  const { register, handleSubmit, reset } = useForm();

  const submitHandler = (data) => {
    props.handleSubmit(data);
    reset();
  };

  return (
    <Card className='form'>
      <Container>
        <h3 data-testid='form-title'>Add Item</h3>
        <Form onSubmit={handleSubmit(submitHandler)} data-testid='main-form'>
          <Form.Group controlId='text'>
            <Form.Label>To Do Item</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter To Do'
              {...register("text")}
            />
          </Form.Group>
          <Form.Group controlId='assignee'>
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              type='text'
              placeholder='Assignee Name'
              {...register("assignee")}
            />
          </Form.Group>
          <Form.Group controlId='difficulty'>
            <Form.Label>Difficulty</Form.Label>
            <Form.Control
              type='range'
              defaultValue='1'
              min='1'
              max='5'
              {...register("difficulty")}
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
