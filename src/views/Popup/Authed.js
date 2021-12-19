import React, { Component } from 'react';
import {
  Container, Segment, Button, Checkbox, Header, Icon, Label, Placeholder
} from 'semantic-ui-react';

export default class Authed extends Component {
  onSettings = (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage && chrome.runtime.openOptionsPage();
  }

  onLogout = (e) => {
    e.preventDefault();
    const {accountLogout} = this.props;
    accountLogout();
  }

  onCheck = (e, { checked }) => {
    e.preventDefault();
    const {setEnabled, setStats} = this.props;
    setEnabled(checked);
    !checked && setStats(false);
  }

  render () {
    const { name, keywords, enabled, stats } = this.props;
    return (
      <div>

        <Container textAlign='center'>
          <Button floated='left' circular icon='cog' onClick={this.onSettings} />
          <Button floated='right' circular icon='sign out' onClick={this.onLogout} />
          <Button>북마크 등록</Button>
        </Container>

      </div>
    );
  }
}
