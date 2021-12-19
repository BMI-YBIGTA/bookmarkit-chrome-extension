import React, { Component } from "react";
import {
  Container,
  Segment,
  Button,
  Checkbox,
  Header,
  Icon,
  Label,
  Placeholder,
  Modal,
} from "semantic-ui-react";

export default class Authed extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  onSettings = (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage && chrome.runtime.openOptionsPage();
  };

  onLogout = (e) => {
    e.preventDefault();
    const { accountLogout } = this.props;
    accountLogout();
  };

  onCheck = (e, { checked }) => {
    e.preventDefault();
    const { setEnabled, setStats } = this.props;
    setEnabled(checked);
    !checked && setStats(false);
  };

  onSync = (e) => {
    e.preventDefault();
    this.BookmarkService.getListAboutTree().then(console.log);
    this.setState({
      open: true,
    });
  };

  BookmarkService = Object.freeze({
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

  render() {
    const { name, keywords, enabled, stats } = this.props;
    const { open } = this.state;
    return (
      <div>
        <Container textAlign="center">
          <Button
            floated="right"
            circular
            icon="sign out"
            onClick={this.onLogout}
          />
          <Button>북마크 등록</Button>
          <Button className="sync" onClick={this.onSync}>
            북마크 동기화
          </Button>
          <Modal
            header="Reminder!"
            content="Call Benjamin regarding the reports."
            actions={[
              "Snooze",
              { key: "done", content: "Done", positive: true },
            ]}
            open={open}
            onOpen={() => this.setState({ open: true })}
            onClose={() => this.setState({ open: false })}
          />
        </Container>
      </div>
    );
  }
}
