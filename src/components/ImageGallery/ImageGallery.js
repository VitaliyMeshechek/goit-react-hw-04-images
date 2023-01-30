// import {toast} from 'react-hot-toast';

import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

// import React, { Component } from 'react';
// import { fetchPictures } from 'components/Api';
// import { Button } from 'components/Button/Button';
// import { ContainerBtn } from './ImageGallery.styled';

// Перший спосіб
// export class ImageGallery extends Component {
//   state = {
//     page: 1,
//     searchName: '',
//     isLoading: false,
//     galleryPictures: [],
//     largeImageURL: '',
//     total: 0,
//     error: null,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const { page } = this.state;
//     const prevSearchName = prevProps.searchName;
//     const nextSearchName = this.props.searchName;

//     if (prevSearchName !== nextSearchName || prevState.page !== page) {
//       const { page } = this.state;
//     this.setState({ isLoading: true });
//     try {
//       const data = await fetchPictures( nextSearchName, page);
//       if (data.total> 0) {
//         this.setState(prevState => ({
//           galleryPictures: [...prevState.galleryPictures, ...data.hits],
//           total: data.total,
//         }));
//       } else {
//         toast.error('Oops, your request was not fulfilled! Repeat your request!');
//       }
//     } catch (error) {
//       this.setState({error: 'Something went wrong:('})
//     } finally {
//       this.setState({isLoading: false});
//     }
//     }
//   }

//     onLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render () {
//     const {galleryPictures, total} = this.state;
//     const showLoadMore = galleryPictures.length < total;
//     return (<>
//     <List>
//     {galleryPictures.map(({largeImageURL, tags, id}) => (
//         <ImageGalleryItem
//         key={id}
//         src={largeImageURL}
//         alt={tags}
//         largeImageURL={largeImageURL}
//         />
//     ))}
//   </List>
//     <ContainerBtn>
//      { showLoadMore && <Button onClick={this.onLoadMore}/>}
//      </ContainerBtn>
//      </>)
//   }
// }

// Другий спосіб
export function ImageGallery({ items, onClick }) {
  return (
    <List>
      {items.map(({ webformatURL, largeImageURL, tags, id }) => (
        <ImageGalleryItem
          key={id}
          src={webformatURL}
          alt={tags}
          largeImageURL={largeImageURL}
          onClick={onClick}
        />
      ))}
    </List>
  );
}

ImageGallery.protoTypes = {
  onClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
