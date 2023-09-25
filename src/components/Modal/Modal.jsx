import { Component } from 'react';
import css from '../Styles.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.onEscClose);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.onEscClose);
  }

  render() {
    return (
      <div onMouseDown={this.props.onBackdropClose} className={css.Overlay}>
        <div className={css.Modal}>
          <img src={this.props.modalImage} alt="" />
        </div>
      </div>
    );
  }
}
