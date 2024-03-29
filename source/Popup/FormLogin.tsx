/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// import {useRef, useEffect, useState} from 'react';
import React, {useEffect} from 'react';
import {browser} from 'webextension-polyfill-ts';
import {onApiLogin} from '../api/authApi';
import {setToken} from '../api/common';
import {configApi} from '../api/config';
import UserContext from './UserContext';

export default function FormLogin(): JSX.Element {
  const {setUserData} = React.useContext(UserContext);

  const [userName, setUserName] = React.useState('truong@menucoster.com');
  const [passWord, setPassword] = React.useState('Menuwise@2024');
  const [messError, setMessError] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const onLogin = async (): Promise<void> => {
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
        token: res.token.accessToken,
      };
      setToken(currentData.token);
      localStorage.setItem('USER_INFO', JSON.stringify(currentData));
      setUserData(currentData);
    }
  };

  useEffect(() => {
    setMessError('');
  }, [userName, passWord]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '20px',
          position: 'relative',
        }}
      >
        <img
          src={'https://new-client-dev.menuwise.com/assets/logo-f7c64a1f.svg'}
          style={{width: '200px', filter: 'blur(0px)', top: 5}}
        />
      </div>
      <div className=" pb-12">
        <div id="formLogin">
          <div className="w-full">
            <div className="row input-container w-full justify-between flex flex-wrap gap-2">
              <div className="styled-input mt-2">
                <div className="fontLabel">Email</div>
                <input
                  type="email"
                  value={userName}
                  className="border-[1px] rounded-sm"
                  onChange={(e) => setUserName(e.target.value.trim())}
                  onFocus={(e) => {
                    e.target.value = e.target.value.trim();
                  }}
                />
              </div>

              <div className="styled-input mt-2">
                <div className="fontLabel">Password</div>
                <input
                  type="password"
                  value={passWord}
                  className="border-[1px] rounded-sm"
                  onChange={(e) => setPassword(e.target.value)}
                  // onBlur={onUpdateData}
                  // maxLength={MAX_LENGTH_EMAIL}
                  onFocus={(e) => {
                    e.target.value = e.target.value.trim();
                  }}
                />
              </div>
              {!!messError && <div style={{color: 'red'}}>{messError}</div>}
            </div>
            <div style={{display: 'flex', justifyContent: 'right'}}>
              <p
                style={{cursor: 'pointer', width: 'fit-content'}}
                onClick={() => {
                  browser.tabs.create({
                    url: configApi.domainWeb,
                    active: true,
                  });
                }}
              >
                Forgot password!
              </p>
            </div>
            <button type="submit" className="btnLogin" onClick={onLogin}>
              {isLoading ? <div className="loader" /> : `Login`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
