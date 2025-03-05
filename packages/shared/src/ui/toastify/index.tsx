import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (message: string, options = {}) => {
  toast(message, options);
};

export const Toast = () => {
  return <ToastContainer
      data-testid="message-toast"
      position="bottom-right" // Cambia aquí para "bottom-left" si lo prefieres
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />;
};