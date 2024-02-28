// import {useRef, useEffect, useState} from 'react';
import React, {useEffect} from 'react';
import {onApiLogin} from '../api/authApi';
import UserContext from './UserContext';

export default function FormLogin() {
  const {setUserData} = React.useContext(UserContext);

  const [userName, setUserName] = React.useState('truong@menucoster.com');
  const [passWord, setPassword] = React.useState('Menuwise@2024');
  const [messError, setMessError] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);


  const onLogin = async () => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    const res = await onApiLogin(userName, passWord);
    setLoading(false);
    if (typeof res === 'string') {
      setMessError(res);
    } else {
      const currentData = {
        user: res.user,
        token: res.token.accessToken
      };
      localStorage.setItem("USER_INFO", JSON.stringify(currentData));
      setUserData(currentData);
    }
  };

  useEffect(() => {
    setMessError('');
  }, [userName, passWord]);

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '20px', position: 'relative'}}>
        {/* <img src={'https://new-client-dev.menuwise.com/assets/logo-f7c64a1f.svg'} style={{width: '250px'}} /> */}
        <img src={'https://new-client-dev.menuwise.com/assets/logo-f7c64a1f.svg'} style={{width: '200px', filter: 'blur(0px)', top: 5}} />
      </div>
      <div className=' pb-12' >
        <div id="formLogin" >
          <div className='w-full'>
            <div className='row input-container w-full justify-between flex flex-wrap gap-2'>
              <div className='styled-input mt-2'>
                <div className='fontLabel'>Email</div>
                <input
                  type='email'
                  value={userName}
                  className='border-[1px] rounded-sm'
                  onChange={(e) => setUserName(e.target.value.trim())}
                  onFocus={(e) => {
                    e.target.value = e.target.value.trim();
                  }}
                />
              </div>

              <div className='styled-input mt-2'>
                <div className='fontLabel'>Password</div>
                <input
                  type='password'
                  value={passWord}
                  className='border-[1px] rounded-sm'
                  onChange={(e) => setPassword(e.target.value)}
                  // onBlur={onUpdateData}
                  // maxLength={MAX_LENGTH_EMAIL}
                  onFocus={(e) => {
                    e.target.value = e.target.value.trim();
                  }}
                />
              </div>
              {!!messError && <div style={{color: 'red'}}>
                {messError}
              </div>}
            </div>
            <button type="submit" className='btnLogin'
              onClick={onLogin}
            >
              {isLoading ? <div className='loader' /> : `Login`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
