import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { Navbar, Button, Nav, Form, FormControl } from "react-bootstrap";
import { LoginContext } from "../context/LoginProvider.js";

function NavBar(props) {
  const { register, handleSubmit, reset } = useForm();

  const userContext = useContext(LoginContext);

  const submitHandler = (data) => {
    console.log("IM LOGGING IN");
    userContext.login(data);
    reset();
  };

  const registerHandler = (data) => {
    console.log("IM REGISTERING");
    userContext.register(data);
    reset();
  };
  return (
    // <>
    <Navbar data-testid='navbar' bg='primary' variant='dark'>
      <Navbar.Brand href='#home'>ToDo</Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Link href='#home'>Home</Nav.Link>
      </Nav>
      {!userContext.isLoggedIn ? (
        <>
          <Form onSubmit={handleSubmit(registerHandler)} inline>
            <FormControl
              {...register("registerUsername")}
              type='text'
              placeholder='Username'
              className='mr-sm-2'
            />
            <FormControl
              {...register("registerPassword")}
              type='text'
              placeholder='Password'
              className='mr-sm-2'
            />
            <FormControl
              {...register("role")}
              as='select'
              placeholder='Password'
              className='mr-sm-2'
              defaultValue='user'
            >
              <option value='user'>user</option>
              <option value='editor'>editor</option>
              <option value='admin'>admin</option>
            </FormControl>
            <Button type='submit' variant='outline-light'>
              Register
            </Button>
          </Form>
          <hr />
          <Form onSubmit={handleSubmit(submitHandler)} inline>
            <FormControl
              {...register("username")}
              type='text'
              placeholder='Username'
              className='mr-sm-2'
            />
            <FormControl
              {...register("password")}
              type='text'
              placeholder='Password'
              className='mr-sm-2'
            />

            <Button type='submit' variant='outline-light'>
              Login
            </Button>
          </Form>
        </>
      ) : (
        <Button onClick={userContext.logout} variant='danger'>
          Logout
        </Button>
      )}
    </Navbar>
    // </>
  );
}

export default NavBar;
