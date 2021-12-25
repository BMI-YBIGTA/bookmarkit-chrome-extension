import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import { accountAuth, accountProfile, accountLogout } from '../actions/account';
import { setEnabled, setStats } from '../actions/marker';
import { setPageName } from '../actions/switchs';
import Authed from './Authed';
import Unauthed from './Unauthed';
import './App.css';

const App = (props) => {
  const [loginState, setLoginState] = useState(false);
  const { token } = props;
  const View = loginState ? Authed : Unauthed;
  //const View = Authed;
  return (
    <div className='App'>
      <Header as='h3' attached='top' textAlign='center' inverted color='teal'>
        Bookmarkit
      </Header>
      <div className='App-view'>
        <View props={props} setLoginState={setLoginState} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) =>
  Object.assign({}, state.account, state.marker, state.switchs);

const mapDispatchToProps = (dispatch) => ({
  accountAuth: (data) => {
    dispatch(accountAuth(data));
  },
  accountProfile: (data) => {
    dispatch(accountProfile(data));
  },
  accountLogout: () => {
    dispatch(accountLogout());
  },
  setEnabled: (data) => {
    dispatch(setEnabled(data));
  },
  setStats: (data) => {
    dispatch(setStats(data));
  },
  setPageName: (data) => {
    dispatch(setPageName(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
