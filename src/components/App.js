import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';

import React, { Component } from 'react';
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
} from './Modal/Modal.styled';

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

export class App extends Component {
  state = {
    page: 1,
    searchName: '',
    isLoading: false,
    galleryPictures: [],
    largeImageURL: '',
    total: 0,
    showModal: false,
    error: null,
  };


  onSearchName = value => {
    this.setState({
      searchName: value,
      page: 1,
      galleryPictures: [],
      total: 0,
      error: null,
    });
  }

  async componentDidUpdate(_, prevState) {
    const { searchName, page } = this.state;

    if (prevState.searchName !== searchName || prevState.page !== page) {
      const { searchName, page } = this.state;
      this.setState({ isLoading: true });
      try {
        const data = await fetchPictures(searchName, page);
        if (data.total > 0) {
          this.setState(prevState => ({
            galleryPictures: [...prevState.galleryPictures, ...data.hits],
            total: data.total,
          }));
        } else {
          toast.error(
            'Oops, your request was not fulfilled! Repeat your request!'
          );
        }
      } catch (error) {
        this.setState({ error: 'Something went wrong:(' });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onToggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  onOpenModal = evt => {
    const largeImageURL = evt.target.dataset.source;
    if (largeImageURL) {
      this.setState({ largeImageURL: largeImageURL });
      this.onToggleModal();
    }
  };

  render() {
    const {
      showModal,
      largeImageURL,
      imageAlt,
      galleryPictures,
      total,
      isLoading,
    } = this.state;
    const showLoadMore = galleryPictures.length < total;
    return (
      <WrapperContainer>
        <Toaster />
        <Searchbar onSubmit={this.onSearchName} />
        <ImageGallery
          onClick={this.onOpenModal}
          items={galleryPictures}
        ></ImageGallery>
        <ContainerBtn>
          {showLoadMore && <Button onClick={this.onLoadMore} />}
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
          <Modal onToggleModal={this.onToggleModal}>
            <ContainerButtonIcon>
              <ButtonIcon onClick={this.onToggleModal} aria-label="Close modal">
                <CloseIcon size={50} fill="#ff4500" />
              </ButtonIcon>
            </ContainerButtonIcon>
            <img src={largeImageURL} alt={imageAlt} />
          </Modal>
        )}
      </WrapperContainer>
    );
  }
}
