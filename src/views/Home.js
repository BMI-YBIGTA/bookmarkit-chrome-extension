import React, { useState } from 'react';
import {
  Container, Button
} from 'semantic-ui-react';

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

const Home = (props) => {
  console.log(props);
  // const { name, keywords, enabled, stats, pageName } = props;
  const [state, setState] = useState({open: false});

  const onLogout = (e) => {
    e.preventDefault();
    const {accountLogout} = props;
    accountLogout();
  }

  // const onCheck = (e, { checked }) => {
  //   e.preventDefault();
  //   const {setEnabled, setStats} = props;
  //   setEnabled(checked);
  //   !checked && setStats(false);
  // }

  const onSync = (e) => {
    e.preventDefault();
    BookmarkService.getListAboutTree().then((data) => {
      // API Call - TBD
    });
    setState({
      open: true
    })
  }

  const onAdd = (e) => {
    e.preventDefault();
    const {setPageName} = props;
    setPageName("Register");
  }

  const onRecommend = (e) => {
    e.preventDefault();
    const {setPageName} = props;
    setPageName("Recommend");
  }

  const onLinkBoard = (e) => {
    chrome.tabs.create({url: 'http://www.naver.com'});
  }

  return (
    <div>
      <Container textAlign='center'>
        <Button floated='right' circular icon='sign out' onClick={onLogout} />
        <Button onClick={onAdd}>북마크 등록</Button>
        <Button className='sync' onClick={onSync}>북마크 동기화</Button>
        <Button onClick={onLinkBoard}>북마크 대시보드 이동</Button>
        <Button className='recommend' onClick={onRecommend}>유사한 사이트 추천</Button>
      </Container>
    </div>
  );
}


export default Home;