import axios from 'axios';
import React, {useState} from 'react';
import { Header, Button, Input, Form } from 'semantic-ui-react';
import { registerBookmark } from '../api';



const Register = (props) => {
  const [pageTitle, setPageTitle] = useState(document.title);

  const onCancel = (e) => {
    e.preventDefault();
    const {setPageName} = props;
    setPageName("Home");
  }

  const onChange = async (e, data) => {
    e.preventDefault();
    setPageTitle(data.value);

  }

  const onRegister = (pageTitle) => {
    registerBookmark(pageTitle);
  }

  return (
    <Form>
      <Header as='h3'>북마크 추가</Header>
      <Form.Field>
        <label>이름</label>
        <Input onChange={onChange} id='url' />
      </Form.Field>
      <Button type='submit' onClick={onRegister}>등록</Button>
      <Button type="cancel" onClick={onCancel}>취소</Button>
    </Form>
  )
};

export default Register;