import css from '../Styles.module.css';

export const Modal = ({ modalImage, onBackdropClose }) => {
  return (
    <div onMouseDown={onBackdropClose} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={modalImage} alt="" />
      </div>
    </div>
  );
};
