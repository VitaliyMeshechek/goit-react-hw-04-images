import PropTypes from 'prop-types';
import { Item, Img } from './ImageGalleryItem.styled';
// import React, { Component } from 'react';
// import { Modal } from "components/Modal/Modal";

// Перший спосіб
// export class ImageGalleryItem extends Component {
//   state = {
//     largeImageURL: '',
//     showModal: '',
//   };

//     onToggleModal = () => {
//     this.setState(prevState => ({ showModal: !prevState.showModal }));
//   };

//   onOpenModal = (event) => {
//     const largeImageURL = event.target.dataset.source;
//     if (largeImageURL) {
//       this.setState({ largeImageURL: largeImageURL});
//       this.onToggleModal();
//     }
//   };

//   render() {
//     const {showModal} = this.state;
//     const {src, alt, largeImageURL} = this.props;
//     return (
//       <>
//       <Item onClick={this.onOpenModal}>
//         <Img src={largeImageURL} alt={alt} data-source={largeImageURL} />
//         </Item>

//       {showModal && (<Modal onToggleModal={this.onToggleModal} >
//         <Img src={src} alt={alt} data-source={largeImageURL} onClick={this.onOpenModal}/>
//         </Modal>)}

//         </>
//     )
//   }
// }

// Другий спосіб
export const ImageGalleryItem = ({ src, largeImageURL, alt, onClick }) => {
  return (
    <Item>
      <Img src={src} alt={alt} data-source={largeImageURL} onClick={onClick} />
    </Item>
  );
};

ImageGalleryItem.protoTypes = {
  src: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
