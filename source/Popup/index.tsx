import * as React from 'react';
import ReactDOM from 'react-dom';

import Popup from './Popup';
import WrapContaner from './WrapContaner';

ReactDOM.render(<WrapContaner><Popup /></WrapContaner>, document.getElementById('popup-root'));
