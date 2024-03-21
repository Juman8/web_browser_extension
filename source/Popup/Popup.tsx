/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import {setToken} from '../api/common';
import FormLogin from './FormLogin';
import {ScrapperScreen} from './ScrapperScreen';

import './styles.scss';
import UserContext from './UserContext';
import Toast from '../component/Toast';
import {ToastService} from '../component/ToastService';

const Popup: React.FC = () => {
  const {dataUser, setUserData} = React.useContext(UserContext) as any;
  const [isLoading, setIsLoading] = React.useState(true);

  const getToken = async (): Promise<void> => {
    const data = await localStorage.getItem('USER_INFO');
    if (data) {
      const newDataUser = JSON.parse(data);
      setToken(newDataUser.token);
      setUserData(newDataUser);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    getToken();
  }, []);

  if (isLoading) {
    return null;
  }
  if (dataUser?.token) {
    return (
      <>
        <ScrapperScreen />
        <Toast ref={ToastService.refToast} />
      </>
    );
  }

  return (
    <>
      <section id="popup">
        <FormLogin />
        <Toast ref={ToastService.refToast} />
      </section>
    </>
  );
};

export default Popup;
