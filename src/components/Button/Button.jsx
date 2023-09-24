import css from '../Styles.module.css';
export const Button = ({ onLoadMoreClick }) => {
  return (
    <button onClick={onLoadMoreClick} type="button" className={css.Button}>
      Load more
    </button>
  );
};
