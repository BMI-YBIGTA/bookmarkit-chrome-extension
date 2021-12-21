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
    
      const onSignUp = (e) => {
        



        const {setPageName} = props;
        setPageName("Home")
      }
    

    return(
    <Form>
      <Header as='h3'>회원가입</Header>
      <Form.Field>
        <label>ID</label>
        <Input placeholder="아이디를 입력하세요" onChange={onChange}/>
      </Form.Field>
      <Form.Field>
        <label>PW</label>
        <Input placeholder="비밀번호를 입력하세요" onChange={onChange}/>
      </Form.Field>
      <Form.Field>
        <label>Nickname</label>
        <Input placeholder="닉네임을 입력하세요" onChange={onChange}/>
      </Form.Field>
      <Button type='submit' onClick={onSignUp}>등록</Button>
      <Button type="cancel" onClick={onCancel}>취소</Button>
    </Form>
    )


}

export default SignUp;