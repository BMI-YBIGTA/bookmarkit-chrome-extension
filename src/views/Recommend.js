import React, {useState} from 'react';
import { Header, Button, Input, Form, Divider } from 'semantic-ui-react';

const Recommend = (props) => {

    const onLinkHome = (e) => {
        e.preventDefault();
        const {setPageName} = props;
        setPageName("Home");
      }

    return (
        <div>
            <Header as='h3'>사이트 추천 목록</Header>
            <div>1. blah blah</div>
            <Divider />
            <div>2. blah blah</div>
            <Divider />
            <div>3. blah blah</div>
            <Button onClick={onLinkHome}>뒤로 가기</Button>
        </div>

    )

}

export default Recommend;