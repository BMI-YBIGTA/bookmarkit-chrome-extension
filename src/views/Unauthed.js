import React, { Component, useState } from 'react';
import { Form, Message } from 'semantic-ui-react';
import { auth, fetchProfile } from '../api';
import SignUp from './SignUp';

const Unauthed  = (props) => {
  console.log("unauthed");
  const [state, setState] = useState({loading: false, message: false});

  const login = async (data) => {
    const {accountAuth, accountProfile} = props;
    setState({
      loading: true, message: false
    });
    let resp = data && await auth(data);
    const token = resp && resp.ok && resp.token;
    setState({
      loading: false, message: !token && (resp.message || 'Unknown Error')
    });
    if (!token)
      return;
    accountAuth(token);
    resp = token && await fetchProfile(token);
    resp && resp.ok && resp.data && accountProfile(resp.data);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("hihi")
    const fields = e.target.elements;
    if (!fields)
      return;
    let data = {}, b = false;
    for (let field of fields) {
      if (!field.name) continue;
      data[field.name] = field.value;
      b = true;
    }
    b && login(data);
    const {setPageName} = props;
    setPageName("Home");
  }

  const onSignUp = (e) => {
    e.preventDefault();
    const {setPageName} = props;
    setPageName("SignUp");
  }

if(props.pageName === "SignUp") {
  return (
    <SignUp {...props}/>
  )
} else {
 
    return (
      <div style={{height: "100px"}}>
      <Form onSubmit={onSubmit} loading={state.loading} error={Boolean(state.message)}>
          <Form.Input
            name="username" required
            fluid icon='user' iconPosition='left' placeholder='Usernames'
          />
          <Form.Input
            name="password" type='password' required
            fluid icon='lock' iconPosition='left' placeholder='Password'
          />
          <Form.Button type="submit" fluid color='blue'>Log in</Form.Button>
          <Form.Button fluid color='blue' onClick={onSignUp}>Sign Up</Form.Button>
          {state.message && <Message error size='small' content={state.message} />}
          
      </Form>
      </div>
    );
  }
}

export default Unauthed;