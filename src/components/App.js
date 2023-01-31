import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';

import { WrapperContainer } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { ContainerBtn } from './ImageGallery/ImageGallery.styled';
import { BallTriangle } from 'react-loader-spinner';
import { fetchPictures } from './Api';
import {
  ContainerButtonIcon,
  ButtonIcon,
  CloseIcon,
  Image,
} from './Modal/Modal.styled';
import { useState, useEffect } from 'react';

// Перший спосіб коли, всі компоненти робимо через класи,
// коли значення з Searchbar передаємо в App а потім пропсами
// прокидаємо в ImageGallery, де рендеримо карточки із запитом
// і також відкриваємо модалку. Запит робимо в ImageGallery.

//  export class App extends Component {
//    state = {
//     galleryPictures: [],
//     searchName: '',
//      isLoading: false,
//     error: null,
//   }

//     handleSearchSubmit = searchName => {
//      this.setState({searchName})

//     }

//  render() {
//     const {isLoading, searchName, error} = this.state;

//   return (
//     <div>
//      <Searchbar onSubmit={this.handleSearchSubmit} />
//       <Toaster toastOptions={{duration: 4000}} />
//      <ImageGallery searchName={searchName} />
//       {isLoading ? (
//           <BallTriangle
//           height={100}
//           width={100}
//           radius={5}
//           color="#4fa94d"
//           ariaLabel="ball-triangle-loading"
//           wrapperStyle={{ display: 'block', margin: '0 auto' }}
//           visible={true}
//           />
//        ) : null}
//       {error && <p>{error}</p>}
//   </div>
//  )
//  }
//  }

// Другий спосіб, коли всі компоненти робимо через функції,
// пропси прокидаємо за класичною схемою, від APP до ImageGalleryItem.
// При цьому запит робимо в APP.

export const App = () => {
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [galleryPictures, setGalleryPictures] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const onSearchName = (value) => {
    setSearchName(value);
    setPage(1);
    setGalleryPictures([]);
    setTotal(0);
    setError(null);
  }

  useEffect(() => {
    async function fetchPicturesEffect() {
      if (!searchName) return;
      setIsLoading(true);

        try {
          const data = await fetchPictures(searchName, page);
          if (data.total > 0) {
            setGalleryPictures(prevGalleryPictures =>
              [...prevGalleryPictures, ...data.hits]);
              setTotal(data.total);
          } else {
            toast.error(
              'Oops, your request was not fulfilled! Repeat your request!', error
            );
          }
        } catch (error) {
          setError('Something went wrong:(');
        } finally {
          setIsLoading(false);
        }
      }
    fetchPicturesEffect()
  }, [error, page, searchName])


  const onLoadMore = () => {
    setPage(prevPage => (prevPage + 1));
  };

  const onToggleModal = () => {
    setShowModal(prevShowModal => (!prevShowModal));
  };

  const onOpenModal = evt => {
    const largeImageURL = evt.target.dataset.source;
    if (largeImageURL) {
      setLargeImageURL(largeImageURL);
      onToggleModal();
    }
  };

  const showLoadMore = galleryPictures.length < total;
  return (
    <WrapperContainer>
      <Toaster />
      <Searchbar onSubmit={onSearchName} />
      <ImageGallery
        onClick={onOpenModal}
        items={galleryPictures}
      ></ImageGallery>
      <ContainerBtn>
        {showLoadMore && <Button onClick={onLoadMore} />}
      </ContainerBtn>
      {isLoading ? (
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{ display: 'block', margin: '0 auto' }}
          visible={true}
        />
      ) : null}
      {showModal && (
        <Modal onToggleModal={onToggleModal}>
          <ContainerButtonIcon>
            <ButtonIcon onClick={onToggleModal} aria-label="Close modal">
              <CloseIcon size={50} fill="#ff4500" />
            </ButtonIcon>
          </ContainerButtonIcon>
          <Image src={largeImageURL} alt="" />
        </Modal>
      )}
    </WrapperContainer>
  );
}



// export class App extends Component {
//   state = {
//     page: 1,
//     searchName: '',
//     isLoading: false,
//     galleryPictures: [],
//     largeImageURL: '',
//     total: 0,
//     showModal: false,
//     error: null,
//   };




//   render() {
//     const {
//       showModal,
//       largeImageURL,
//       imageAlt,
//       galleryPictures,
//       total,
//       isLoading,
//     } = this.state;

//   }
// }
