import React, { useState } from 'react';
import Register from './Register';
import Home from './Home';

const Authed = (props) => {
  // console.log(props);
  const { name, keywords, enabled, stats, pageName } = props;
  const [state, setState] = useState({open: false});

  switch (pageName) {
    case "Home":
      return <Home {...props} />;
    case "Register": 
      return <Register {...props} />;
    default:
      return <div></div>;
  }
}

export default Authed;