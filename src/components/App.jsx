import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getSearchApi } from 'api/apiGallery';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { RotatingLines } from 'react-loader-spinner';
import css from './Styles.module.css';
import { Modal } from './Modal/Modal';
export class App extends Component {
  state = {
    isLoading: false,
    images: null,
    searchValue: '',
    currentPage: 1,
    modalImage: '',
  };
  onInputFind = value => {
    this.setState({ searchValue: value });
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchValue !== this.state.searchValue) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    this.setState({
      currentPage: 2,
      isLoading: true,
    });

    try {
      const { hits } = await getSearchApi(this.state.searchValue);
      if (hits.length === 0) {
        this.setState({ images: null });
      } else {
        this.setState({ images: hits });
      }
    } catch (error) {
      alert(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  fetchMoreImages = async () => {
    this.setState({ isLoading: true });
    try {
      const { hits } = await getSearchApi(
        this.state.searchValue,
        this.state.currentPage
      );
      this.setState(prev => ({ images: [...prev.images, ...hits] }));
    } catch (error) {
      alert(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  onLoadMoreClick = () => {
    this.fetchMoreImages();
    this.setState(prev => ({ currentPage: prev.currentPage + 1 }));
  };
  onImageClick = e => {
    if (e.target !== e.currentTarget) {
      this.setState({
        modalImage: e.target.alt,
        modalIsOpen: true,
      });
    }
  };
  onBackdropClose = e => {
    if (e.target === e.currentTarget) {
      this.setState({ modalIsOpen: false });
    }
  };
  onEscClose = e => {
    if (e.code !== 'Escape') {
      return;
    }
    this.setState({ modalIsOpen: false });
  };
  render() {
    return (
      <div className={css.App}>
        {this.state.modalIsOpen && (
          <Modal
            onBackdropClose={this.onBackdropClose}
            modalImage={this.state.modalImage}
            onEscClose={this.onEscClose}
          />
        )}
        <Searchbar onFind={this.onInputFind} />
        <ImageGallery
          images={this.state.images}
          onImageClick={this.onImageClick}
        />
        {this.state.isLoading && (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        )}
        {this.state.images && <Button onLoadMoreClick={this.onLoadMoreClick} />}
      </div>
    );
  }
}
