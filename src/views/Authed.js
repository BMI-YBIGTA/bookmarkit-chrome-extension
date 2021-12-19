import React, { Component, useState } from 'react';
import {
  Container, Segment, Button, Checkbox, Header, Icon, Label, Placeholder
} from 'semantic-ui-react';
import Register from './Register';

const BookmarkService = Object.freeze({

  /** 북마크 트리를 가져옵니다. **/
  getTree () {
    return new Promise(resolve => {
      chrome.bookmarks.getTree(([ tree ]) => resolve(tree));
    })
  },

  /** 북마크의 트리를 목록으로 변환하여 가져옵니다. **/
  async getListAboutTree () {
    const tree = await this.getTree()
    let bookmarks = tree.children.flatMap(v => v.children);
    while (bookmarks.find(v => v.children)) {
      bookmarks = bookmarks.flatMap(v => v.children || [ v ])
    }
    return bookmarks.map(({ id, title, url }) => ({ id, title, url }));
  },
});

const Authed = (props) => {

  const { name, keywords, enabled, stats } = props;
  const [state, setState] = useState({open: false});

  const onLogout = (e) => {
    e.preventDefault();
    const {accountLogout} = props;
    accountLogout();
  }

  const onCheck = (e, { checked }) => {
    e.preventDefault();
    const {setEnabled, setStats} = props;
    setEnabled(checked);
    !checked && setStats(false);
  }

  const onSync = (e) => {
    e.preventDefault();
    BookmarkService.getListAboutTree().then(console.log);
    setState({
      open: true
    })
  }

  const onAdd = (e) => {
    e.preventDefault();

  }

  return (
    <div>
      <Container textAlign='center'>
        <Button floated='right' circular icon='sign out' onClick={onLogout} />
        <Button onClick={onAdd}>북마크 등록</Button>
        <Button className='sync' onClick={onSync}>북마크 동기화</Button>
      </Container>
    </div>
  );
}


export default Authed;