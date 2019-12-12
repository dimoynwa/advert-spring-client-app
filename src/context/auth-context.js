import React from 'react';

export default React.createContext({
  userData: {},
  authToken: null,
  addToken: token => {},
  addLoggedUser: user => {},
  logOut: () => {},
  getUserAvatar: () =>{},
  getUserId: () => {},
  handleError: error => {},
});
