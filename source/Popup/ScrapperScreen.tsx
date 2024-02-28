import * as React from 'react';
import UserContext from './UserContext';
import './Scrapper.scss';
import {onApiLogout} from '../api/authApi';

export const ScrapperScreen = () => {
  const {setUserData} = React.useContext(UserContext);
  const onLogout = () => {
    localStorage.removeItem('USER_INFO');
    setUserData('');
    onApiLogout();
  };

  const onClickScapper = () => {
    const path = window.location;
    console.log({path});
  };

  React.useEffect(() => {
    console.log(11122233);
  }, []);

  return (
    <div style={{
    }} id="scapp">
      <button className='bnLogout' onClick={() => {
        onLogout();
      }}>
        Logout
      </button>
      <div className='container'>
        <button className='bnSync' onClick={onClickScapper}>
          Syncs
        </button>
      </div>
    </div>
  );
};