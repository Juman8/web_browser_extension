/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const refToast = React.createRef<any>();

const showToast = (
  message: string,
  type: 'success' | 'failure',
  callback?: () => void
): void => {
  refToast.current.showToast(message, type, callback);
};

export const ToastService = {
  refToast,
  showToast,
};
