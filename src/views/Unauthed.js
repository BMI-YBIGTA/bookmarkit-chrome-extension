import React, { Component, useState } from 'react';
import { Form, Message } from 'semantic-ui-react';
import { auth, fetchProfile, userSignIn } from '../api';
import SignUp from './SignUp';

const Unauthed = ({ props, setLoginState }) => {
  const [state, setState] = useState({ loading: false, message: false });

  const [email, setEmail] = useState('');

  const [pw, setPw] = useState('');

  const onChangeEmail = (e, data) => {
    setEmail(data.value);
  };

  const onChangePw = (e, data) => {
    setPw(data.value);
  };

  const onSignUp = (e) => {
    e.preventDefault();
    const { setPageName } = props;
    setPageName('SignUp');
  };

  const onSignIn = (e) => {
    e.preventDefault();
    userSignIn(email, pw, () => setLoginState(true));
  };

  if (props.pageName === 'SignUp') {
    return <SignUp {...props} />;
  } else {
    return (
      <div style={{ height: '100px' }}>
        <Form loading={state.loading} error={Boolean(state.message)}>
          <Form.Input
            name='username'
            required
            onChange={onChangeEmail}
            fluid
            icon='user'
            iconPosition='left'
            placeholder='e-mail'
          />
          <Form.Input
            name='password'
            type='password'
            required
            onChange={onChangePw}
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='비밀번호'
          />
          <Form.Button fluid color='blue' onClick={onSignIn}>
            로그인
          </Form.Button>
          <Form.Button fluid color='blue' onClick={onSignUp}>
            회원가입
          </Form.Button>
          {state.message && (
            <Message error size='small' content={state.message} />
          )}
        </Form>
      </div>
    );
  }
};

export default Unauthed;
