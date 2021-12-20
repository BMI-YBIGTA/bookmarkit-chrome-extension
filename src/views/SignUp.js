import React, {useState} from "react";
import { Header, Button, Input, Form } from 'semantic-ui-react';

const SignUp = (props) => {

    const [pageTitle, setPageTitle] = useState(document.title);

    const onCancel = (e) => {
        e.preventDefault();
        const {setPageName} = props;
        setPageName("Unauthed");
      }
    
      const onChange = (e, data) => {
        if (!data.value) {
          setPageTitle(document.title);
        } else {
          setPageTitle(data.value);
        }
      }
    
      const onRegister = (e) => {
        
      }
    

    return(
    <Form>
      <Header as='h3'>회원가입</Header>
      <Form.Field>
        <label>ID</label>
        <Input placeholder={document.title} onChange={onChange}/>
      </Form.Field>
      <Button type='submit' onClick={onRegister}>등록</Button>
      <Button type="cancel" onClick={onCancel}>취소</Button>
    </Form>
    )


}

export default SignUp;