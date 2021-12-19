import React, { Component } from 'react';
import {
  Container, Segment, Button, Checkbox, Header, Icon, Label, Placeholder
} from 'semantic-ui-react';
import Register from './Register';

export default class Authed extends Component {
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

  onRegister = (e) => {
    e.preventDefault();
    return (
      <div>
        <Register />
      </div>
    )
  }

  render () {
    const { name, keywords, enabled, stats } = this.props;
    return (
      <div>

        <Container textAlign='center'>
          <Button floated='right' circular icon='sign out' onClick={this.onLogout} />
          <Button onClick={this.onRegister}>북마크 등록</Button>
        </Container>

      </div>
    );
  }
}
