import React, {useContext} from 'react';
import {Redirect, Route} from 'react-router-dom';

import AuthContext from './context/auth-context';

export default ({component: Component, ...rest}) => {
  const context = useContext(AuthContext);

  return (
    <Route {...rest} render={ props =>
      context.authToken ? (
        <Component {...props}/>
      ) : (<Redirect to="/login"/>)
    } />
  );
}
