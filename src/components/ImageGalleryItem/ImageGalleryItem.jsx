import css from '../Styles.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img className={css.GalleryItem} src={webformatURL} alt={largeImageURL} />
    </li>
  );
};
