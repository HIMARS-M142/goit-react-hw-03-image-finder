import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    find: '',
  };
  onFormSubmit = e => {
    e.preventDefault();
  };
  onFormInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar
          onFormInput={this.onFormInput}
          onFormSubmit={this.onFormSubmit}
          inputValue={this.state.find}
        />
      </div>
    );
  }
}
