import React, { useState } from 'react';
import Register from './Register';
import Home from './Home';
import Recommend from './Recommend';

const Authed = ({ props, setLoginState }) => {
  console.log('authed');
  const { name, keywords, enabled, stats, pageName } = props;
  const [state, setState] = useState({ open: false });

  switch (pageName) {
    case 'Home':
      return <Home props={props} setLoginState={setLoginState} />;
    case 'Register':
      return <Register {...props} />;
    case 'Recommend':
      return <Recommend {...props} />;
    default:
      return <Home props={props} setLoginState={setLoginState} />;
  }
};

export default Authed;
