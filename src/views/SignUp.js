import React, { useState } from 'react';
import { Header, Button, Input, Form } from 'semantic-ui-react';
import { userSignUp } from '../api';

const SignUp = (props) => {
  const [pageTitle, setPageTitle] = useState(document.title);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');

  const onCancel = (e) => {
    e.preventDefault();
    const { setPageName } = props;
    setPageName('Unauthed');
  };

  const onChangeId = (e, data) => {
    setId(data.value);
    console.log(data.value);
  };

  const onChangePw = (e, data) => {
    setPw(data.value);
    console.log(data.value);
  };

  const onChangeName = (e, data) => {
    setName(data.value);
    console.log(data.value);
  };

  const onChange = (e, data) => {
    if (!data.value) {
      setPageTitle(document.title);
    } else {
      setPageTitle(data.value);
    }
  };

  const onSignUp = () => {
    userSignUp(id, pw, name, () => {
      const { setPageName } = props;
      setPageName('Unauthed');
    });
  };

  return (
    <Form>
      <Header as='h3'>회원가입</Header>
      <Form.Field>
        <label>ID</label>
        <Input placeholder='아이디를 입력하세요' onChange={onChangeId} />
      </Form.Field>
      <Form.Field>
        <label>PW</label>
        <Input
          type='password'
          placeholder='비밀번호를 입력하세요'
          onChange={onChangePw}
        />
      </Form.Field>
      <Form.Field>
        <label>Name</label>
        <Input placeholder='이름을 입력하세요' onChange={onChangeName} />
      </Form.Field>
      <Button type='submit' onClick={onSignUp}>
        등록
      </Button>
      <Button type='cancel' onClick={onCancel}>
        취소
      </Button>
    </Form>
  );
};

export default SignUp;
