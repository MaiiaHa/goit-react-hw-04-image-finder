//================ hooks ===============
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ src, alt, onClose }) {
  useEffect(() => {
    const hendleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', hendleKeyDown);

    return () => {
      window.removeEventListener('keydown', hendleKeyDown);
    };
  }, [onClose]);

  const hendleBackdrobClose = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={hendleBackdrobClose}>
      <div className={css.Modal}>
        {/* {this.props.children} */}
        {/* APP includes data for modal */}
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
}

//=====================================
// import React, { Component } from 'react';
// import { createPortal } from 'react-dom';
// import css from './Modal.module.css';

// // рендериться через криейт рут щоб бути вище ніж інші дані як z-index
// const modalRoot = document.querySelector('#modal-root');

// export default class Modal extends Component {
//   componentDidMount() {
//     // console.log('modal did mount');
//     window.addEventListener('keydown', this.hendleKeyDown);
//   }
//   componentWillUnmount() {
//     // console.log('modal unmount');
//     window.removeEventListener('keydown', this.hendleKeyDown);
//   }
//   hendleKeyDown = e => {
//     // console.log(e.code);
//     if (e.code === 'Escape') {
//       // console.log('shoud to close modal');
//       this.props.onClose();
//     }
//   };
//   hendleBackdrobClose = e => {
//     // console.log('click on backdrop');
//     // console.log(e.currentTarget, 'currentTarget');
//     // console.log(e.target, 'Target');
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { src, alt } = this.props;

//     return createPortal(
//       <div className={css.Overlay} onClick={this.hendleBackdrobClose}>
//         <div className={css.Modal}>
//           {/* {this.props.children} */}
//           {/* APP includes data for modal */}
//           <img src={src} alt={alt} />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }
