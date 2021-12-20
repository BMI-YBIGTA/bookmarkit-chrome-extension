import React, { useState } from 'react';
import Register from './Register';
import Home from './Home';
import Recommend from './Recommend';

const Authed = (props) => {
  // console.log(props);
  const { name, keywords, enabled, stats, pageName } = props;
  const [state, setState] = useState({open: false});

  switch (pageName) {
    case "Home":
      return <Home {...props} />;
    case "Register": 
      return <Register {...props} />;
    case "Recommend":
      return <Recommend {...props} />;
    default:
      return <div></div>;
  }
}

export default Authed;