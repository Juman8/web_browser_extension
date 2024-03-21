/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useImperativeHandle, useState} from 'react';
import './Toast.scss';

const Toast = React.forwardRef<any, any>((props, ref) => {
  const [type, setType] = useState<'success' | 'failure'>('success');
  const [message, setMessage] = useState<string>('');
  const [animating, setAnimation] = useState<boolean>(true);
  const [callback, setCallback] = useState<any>(null);

  useImperativeHandle(
    ref,
    () => ({
      showToast: (
        _message: string,
        _type: 'success' | 'failure',
        _callback: any
      ): any => {
        setType(_type);
        setMessage(_message);
        setAnimation(true);
        setCallback(() => _callback);
      },
    }),
    []
  );

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setAnimation(false);
        setMessage('');
      }, 5000);
    }
  }, [message]);

  if (!message) {
    return null;
  }
  return (
    <div
      className={`toast ${animating ? 'toast-show' : 'toast-hidden'} ${callback ? 'cursorPointer' : ''}`} // Thêm lớp toast-hidden khi toast không hiển thị
    >
      {message}
      {/*
      <p onKeyDown={callback} onClick={callback} style={{textAlign: 'center'}}>
        {message}
      </p> */}
      {callback && (
        <p
          style={{textDecorationLine: 'underline'}}
          className="cursorPointer"
          onClick={callback}
        >
          Open link
        </p>
      )}
    </div>
  );
});

Toast.displayName = 'Toast';

export default Toast;
