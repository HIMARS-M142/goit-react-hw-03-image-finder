import { Component } from 'react';
import css from '../Styles.module.css';
export class Searchbar extends Component {
  state = {
    find: '',
  };
  onFormSubmit = e => {
    e.preventDefault();
    this.props.onFind(this.state.find);
  };
  onFormInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.onFormSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchButton}>
            <span className="button-label">Search</span>
          </button>

          <input
            value={this.state.find}
            name="find"
            onInput={this.onFormInput}
            className={css.SearchInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
