export const Searchbar = ({ onFormInput, onFormSubmit, inputValue }) => {
  return (
    <header className="searchbar">
      <form onSubmit={onFormSubmit} className="form">
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>

        <input
          value={inputValue}
          name="find"
          onInput={onFormInput}
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
