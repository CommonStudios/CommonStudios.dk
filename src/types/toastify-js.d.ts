declare module 'toastify-js' {
  export interface ToastifyOptions {
    text?: string;
    node?: HTMLElement;
    duration?: number;
    destination?: string;
    newWindow?: boolean;
    close?: boolean;
    gravity?: 'top' | 'bottom';
    position?: 'left' | 'center' | 'right';
    stopOnFocus?: boolean;
    className?: string;
  }

  export interface ToastifyInstance {
    showToast(): void;
    hideToast(): void;
  }

  function Toastify(options: ToastifyOptions): ToastifyInstance;
  export default Toastify;
}

declare module 'toastify-js/src/toastify.css';
