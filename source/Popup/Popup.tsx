import * as React from 'react';
import FormLogin from './FormLogin';
import {ScrapperScreen} from './ScrapperScreen';

import './styles.scss';
import UserContext from './UserContext';

const Popup: React.FC = () => {
  const {dataUser, setUserData} = React.useContext(UserContext) as any;
  const [isLoading, setIsLoading] = React.useState(true);

  const getToken = async () => {
    const data = await localStorage.getItem('USER_INFO');
    if (data) {
      setUserData(JSON.parse(data));
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
      <ScrapperScreen />
    );
  }

  return (
    <>
      <section id="popup" >
        <FormLogin />
      </section>
    </>
  );
};

export default Popup;
