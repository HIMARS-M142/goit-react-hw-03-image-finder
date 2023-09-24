import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from '../Styles.module.css';
export const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul onMouseDown={onImageClick} className={css.ImageGallery}>
      {images &&
        images.map(({ tags, id, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              tags={tags}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
            />
          );
        })}
    </ul>
  );
};
