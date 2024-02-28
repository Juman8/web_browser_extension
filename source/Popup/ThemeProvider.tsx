import React from 'react';
import UserContext from './UserContext';

const MyContextProvider = ({children}: any) => {
  const [dataUser, setUserData] = React.useState();

  const value: any = {
    dataUser,
    setUserData: (data: any) => setUserData(data),
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default MyContextProvider;