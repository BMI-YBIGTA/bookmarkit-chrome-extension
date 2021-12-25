import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button, Modal, Icno } from 'semantic-ui-react';
import { syncBookmark, getCurrentURL } from '../api';

const BookmarkService = Object.freeze({
  /** 북마크 트리를 가져옵니다. **/
  getTree() {
    return new Promise((resolve) => {
      chrome.bookmarks.getTree(([tree]) => resolve(tree));
    });
  },

  /** 북마크의 트리를 목록으로 변환하여 가져옵니다. **/
  async getListAboutTree() {
    const tree = await this.getTree();
    let bookmarks = tree.children.flatMap((v) => v.children);
    while (bookmarks.find((v) => v.children)) {
      bookmarks = bookmarks.flatMap((v) => v.children || [v]);
    }
    return bookmarks.map(({ id, title, url }) => ({ id, title, url }));
  },
});

const Home = ({ props, setLoginState }) => {
  console.log(props);
  // const { name, keywords, enabled, stats, pageName } = props;
  const [open, setOpen] = useState(false);

  const onLogout = (e) => {
    e.preventDefault();
    window.localStorage.clear();
    setLoginState(false);
    const { setPageName } = props;
    setPageName('Unauthed');
  };

  const onOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  // const onCheck = (e, { checked }) => {
  //   e.preventDefault();
  //   const {setEnabled, setStats} = props;
  //   setEnabled(checked);
  //   !checked && setStats(false);
  // }

  const onSync = async (e) => {
    e.preventDefault();
    BookmarkService.getListAboutTree().then((data) => {
      // API Call - TBD
      console.log(data);
      syncBookmark(data);
    });
  };

  const onAdd = (e) => {
    e.preventDefault();
    const { setPageName } = props;
    setPageName('Register');
  };

  const onRecommend = (e) => {
    e.preventDefault();
    const { setPageName } = props;
    setPageName('Recommend');
  };

  const onLinkBoard = (e) => {
    chrome.tabs.create({ url: 'http://www.naver.com' });
  };

  return (
    <div>
      <Container textAlign='center'>
        <Button onClick={onAdd} style={{ marginTop: '10px', width: '180px' }}>
          북마크 등록
        </Button>
        <Button
          className='sync'
          onClick={onOpen}
          style={{ marginTop: '10px', width: '180px' }}
        >
          북마크 동기화
        </Button>
        <Modal
          header='동기화'
          content='북마크를 동기화하시겠습니까?'
          actions={[
            {
              key: 'yes',
              content: '웅',
              positive: true,
              icon: 'checkmark',
              onClick: onSync,
            },
            {
              key: 'done',
              content: '아닝',
              icon: 'remove',
              color: 'red',
              onClick: {},
            },
          ]}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        />
        <Button
          onClick={onLinkBoard}
          style={{ marginTop: '10px', width: '180px' }}
        >
          대시보드 이동
        </Button>
        <Button
          className='recommend'
          onClick={onRecommend}
          style={{ marginTop: '10px', width: '180px' }}
        >
          유사한 사이트 추천
        </Button>
        <Button
          floated='right'
          circular
          icon='sign out'
          onClick={onLogout}
          style={{ marginTop: '10px' }}
        />
      </Container>
    </div>
  );
};

export default Home;
