import { useState, useEffect } from 'react';
import Notiflix from 'notiflix'; // all modules
import { fetchInput } from '../../api/Api';
import css from './App.module.css';
// import { ImSpinner } from 'react-icons/im';

import Button from '../Button/Button';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
// import { toast } from 'react-toastify';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [value, setValue] = useState('');
  const [pictures, setPictures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!value) {
      return;
    }

    setStatus(Status.PENDING);

    fetchInput(value, currentPage)
      .then(({ hits, total, totalHits }) => {
        if (totalHits === 0) {
          Notiflix.Notify.failure(
            'There is no images for this request. Please enter your new search request.'
          );
          return;
        }
        setPictures(pictures => [...pictures, ...hits]);
        setTotalHits(totalHits);
        setStatus(Status.RESOLVED);
        if (currentPage === 1) {
          Notiflix.Notify.success(`We found ${total} images`);
        }
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
        // toast.error('Error');
        Notiflix.Notify.failure(error.message);
      });
  }, [currentPage, value]);

  const onFormSubmit = input => {
    if (value !== input) {
      setValue(input);
      setPictures([]);
      setCurrentPage(1);
      setStatus(Status.IDLE);
      setTotalHits(null);
      setError(null);
    }
  };

  const renderMorePic = () => {
    setCurrentPage(currentPage => currentPage + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onFormSubmit} />
      {status === Status.IDLE && <div>Please enter your search request</div>}
      {status === Status.PENDING && (
        <div className={css.spinner}>
          {/* <ImSpinner size={32} className="iconSpin" />  */}
          {/* Loading... */}
          <Loader />
        </div>
      )}
      {status === Status.REJECTED && <div>{error.message}</div>}
      <ImageGallery photos={pictures} />
      {status === Status.RESOLVED &&
        pictures.length !== totalHits &&
        pictures.length !== 0 && (
          <Button aria-label="Load more" onClick={renderMorePic} />
        )}
      {/* <ToastContainer autoClose={3000} /> */}
    </div>
  );
}
