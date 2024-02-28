import * as React from 'react';

import './styles.scss';
import MyContextProvider from './ThemeProvider';

const WrapContaner: React.FC = (props) => {
  return (
    <MyContextProvider>
      {props.children}
    </MyContextProvider>
  );
};

export default WrapContaner;
