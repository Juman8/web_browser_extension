import React from 'react';

const MyContext = React.createContext({
  dataUser: null,
  setUserData: (data: unknown) => {
    console.log({data});
  }
});

export default MyContext;