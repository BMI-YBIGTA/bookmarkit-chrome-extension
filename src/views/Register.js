import React from 'react';
import { Header, Button, Checkbox, Form } from 'semantic-ui-react';

const Register = () => {

  var link = document.location.href;
  // var pageTitle = $(document).find("title").text(); 
  var pageTitle = document.title;
  console.log(link);
  console.log(pageTitle);

  return (
    <Form>
      <Header as='h3'>북마크 추가</Header>
      <Form.Field>
        <label>이름</label>
        <input placeholder={pageTitle} />
      </Form.Field>
      <Button type='submit'>등록</Button>
    </Form>
  )
};

export default Register;