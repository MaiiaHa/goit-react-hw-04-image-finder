//============== hooks ===================
import { useState } from 'react';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  tags,
  webformatURL,
  largeImageURL,
}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        onClick={toggleModal}
      />
      {showModal && <Modal src={largeImageURL} onClose={toggleModal} />}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

//========================================
// import { Component } from 'react';
// import Modal from 'components/Modal/Modal';
// import PropTypes from 'prop-types';
// import css from './ImageGalleryItem.module.css';

// export default class ImageGalleryItem extends Component {
//   state = { showModal: false };

//   toggleModal = () => {
//     this.setState(state => ({ showModal: !state.showModal }));
//   };

//   render() {
//     const { showModal } = this.state;
//     const { tags, webformatURL, largeImageURL } = this.props;

//     return (
//       <li className={css.ImageGalleryItem}>
//         <img
//           className={css.ImageGalleryItemImage}
//           src={webformatURL}
//           alt={tags}
//           onClick={this.toggleModal}
//         />
//         {showModal && <Modal src={largeImageURL} onClose={this.toggleModal} />}
//       </li>
//     );
//   }
// }

// ImageGalleryItem.propTypes = {
//   tags: PropTypes.string.isRequired,
//   webformatURL: PropTypes.string.isRequired,
//   largeImageURL: PropTypes.string.isRequired,
// };
